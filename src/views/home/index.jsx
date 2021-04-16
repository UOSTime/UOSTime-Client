import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Redirect } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import TimeTable from '@components/home/TimeTable';
import LectureList from '@components/home/LectureList';
import { semesterState } from '@states/Semester';
import { timeTableState, currentTimeTableState } from '@states/TimeTable';
import { requestAPI, API_GET_TIMETABLES, API_CREATE_TIMETABLE, API_DELETE_TIMETABLE } from '@utils/api';
import { Button, Container, makeStyles } from '@material-ui/core';
import MyLectureList from '@components/home/MyLectureList';
import TimeTableCard from '@components/home/TimeTableCard';
import CreateTimeTable from '../../components/home/CreateTimeTable';

export default function Home() {
    // const semester = useRecoilValue(semesterState);
    const semester = {
        year: 2021,
        term: 'A10'
    }
    const classes = useStyles();
    const [currentTimeTable, setCurrentTimeTable] = useRecoilState(currentTimeTableState);
    const timeTableStates = [0, 1, 2, 3].map(idx => {
        const [value, set] = useRecoilState(timeTableState(idx));
        return { value, set };
    });

    const [type, setType] = useState('search');

    useEffect(() => {
        if(!localStorage.getItem('userID')) {
            return;
        }

        const getTimeTables = async () => {
            const response = await requestAPI(API_GET_TIMETABLES().setQuery({year: semester.year, term: semester.term}));

            if(!response || response.status !== StatusCodes.OK) {
                alert('시간표를 가져오는데 실패했어요');
                return null;
            }

            const timeTables = response.data;
            timeTables.sort((a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1);
            timeTables.forEach((timeTable, idx) => {
                timeTableStates[idx].set(timeTable);
            });

            if(timeTables.length) {
                setCurrentTimeTable(0);
            }
        };

        getTimeTables();
    }, []);

    const onSwitch = () => {
        setType(type==='search'? 'my' : 'search');
    }

    const onCreate = async () => {
        const body = {
            year: semester.year,
            term: semester.term,
            name: '시간표'
        }

        const response = await requestAPI(API_CREATE_TIMETABLE(), body);

        if(response.status !== StatusCodes.CREATED) {
            alert('시간표 생성에 실패했어요...');
            return;
        }
        const nextIdx = timeTableStates.filter(timeTable => timeTable.value && timeTable.value._id !== null).length;

        const newTimeTable = response.data;
        timeTableStates[nextIdx].set(newTimeTable);
        console.log(timeTableStates[nextIdx]);
        const maxNum = timeTableStates.filter(state => state.value && state.value._id !== null).length;

        if(maxNum === 1) {
            setCurrentTimeTable(0);
        } else {
            setCurrentTimeTable(maxNum-1);
        }
    };

    const onDelete = async ({target}) => {
        const timeTableIdx = parseInt(target.getAttribute('name'));
        const timeTableId = timeTableStates[timeTableIdx].value._id;
        console.log(timeTableId)
        const response = await requestAPI(API_DELETE_TIMETABLE().setPathParam(timeTableId).setQuery({year: semester.year, term: semester.term}));

        if(response.status !== StatusCodes.NO_CONTENT) {
            alert('시간표를 삭제하지 못했어요...');
            return;
        }
        
        const maxNum = timeTableStates.filter(state => state.value && state.value._id !== null).length;

        if(currentTimeTable === timeTableIdx) {
            if(maxNum === 1) {
                setCurrentTimeTable(null);
            } else {
                setCurrentTimeTable(0);   
            }
        } else {
            console.log('cur', timeTableStates[currentTimeTable].value)
            console.log(currentTimeTable)
        }

        for(let i=timeTableIdx+1; i<maxNum; i++) {
            console.log(i)
            timeTableStates[i-1].set(timeTableStates[i].value);
        }
        timeTableStates[maxNum-1].set({
            _id: null,
            uid: null,
            name: null,
            year: null,
            term: null,
            tlecture_list: [],
            createAt: [],
            updateAt: [],
            __v: null
        });
    };

    const mainTimeTable = <TimeTable timeTableIdx={currentTimeTable} />;
    const timeTableComponents = timeTableStates
                            .filter(timeTable => timeTable.value && timeTable.value._id !== null)
                            .map((_, idx) => <TimeTableCard key={idx} timeTableIdx={idx} onDelete={onDelete} />)

    if(!localStorage.getItem('userID')) {
        return <Redirect to='/login' />;
    }

    return (
        <Container className={classes.root}>
            <Button onClick={onSwitch}>{type==='search' ? '내 강의':'강의 검색'}</Button>
            {
                type==='search' ? <LectureList /> : <MyLectureList />
            }
            { mainTimeTable }
            <Container>
                { timeTableComponents }
                { timeTableComponents.length < 4 ? <CreateTimeTable onClick={onCreate} /> : null}
            </Container>

        </Container>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
})