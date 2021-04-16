import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import TimeTable from '@components/home/TimeTable';
import LectureList from '@components/home/LectureList';
import { semesterState } from '@states/Semester';
import { timeTableState, currentTimeTableState } from '@states/TimeTable';
import { requestAPI, API_GET_TIMETABLES } from '@utils/api';
import { Button, Container, makeStyles } from '@material-ui/core';
import MyLectureList from '../../components/home/MyLectureList';

export default function Home() {
    const semester = useRecoilValue(semesterState);
    const classes = useStyles();
    const setCurrentTimeTable = useSetRecoilState(currentTimeTableState);
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
            const response = await requestAPI(API_GET_TIMETABLES().setQuery({year: 2021, term: 'A10'}));

            if(!response || response.status !== StatusCodes.OK) {
                alert('시간표를 가져오는데 실패했어요');
                return null;
            }

            const timeTables = response.data;

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

    const timeTableComponents = timeTableStates
                            .filter(timeTable => timeTable.value._id !== null)
                            .map((_, idx) => <TimeTable key={idx} timeTableIdx={idx} />)

    if(!localStorage.getItem('userID')) {
        return <Redirect to='/login' />;
    }

    return (
        <Container className={classes.root}>
            <Button onClick={onSwitch}>{type==='search' ? '내 강의':'강의 검색'}</Button>
            {
                type==='search' ? <LectureList /> : <MyLectureList />
            }
            { timeTableComponents }
            
        </Container>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
})