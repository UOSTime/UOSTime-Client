import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { semesterState } from '@states/Semester';
import TimeTable from '@components/TimeTable';
import { requestAPI, API_GET_TIMETABLES } from '@utils/api';
import { StatusCodes } from 'http-status-codes';
import { timeTableListState, timeTableMapState } from '@states/TimeTable';
import LectureList from '../../components/LectureList';
import { Container, makeStyles } from '@material-ui/core';
import { timeTableState } from '../../states/TimeTable';

export default function Home() {
    const [ timeTableMap, setTimeTableMap ] = useRecoilState(timeTableMapState);
    const semester = useRecoilValue(semesterState);
    const classes = useStyles();
    const timeTableStates = [0, 1, 2, 3].map(idx => {
        const [value, set] = useRecoilState(timeTableState(idx));
        return {
            value,
            set
        };
    });

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
        };

        getTimeTables();
    }, []);

    const timeTableComponents = timeTableStates
                            .filter(timeTable => timeTable.value._id !== null)
                            .map((_, idx) => <TimeTable key={idx} timeTableIdx={idx} />)

    if(!localStorage.getItem('userID')) {
        return <Redirect to='/login' />;
    }

    return (
        <Container className={classes.root}>
            <LectureList />
            { timeTableComponents }
        </Container>
    )
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    }
})