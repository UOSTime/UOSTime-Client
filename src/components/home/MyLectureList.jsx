import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { currentTimeTableState, timeTableState, highLightState } from '@states/TimeTable';
import { semesterState } from '@states/Semester';
import LectureRecord from '@components/home/LectureRecord';
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';
import lectureToTime from '@utils/lectureToTime';

export default function MyLectureList() {
    const semester = useRecoilValue(semesterState);
    const setHighlight = useSetRecoilState(highLightState);
    const currentTimeTable = useRecoilValue(currentTimeTableState);
    const [ timeTable, setTimeTable ] = useRecoilState(timeTableState(currentTimeTable));

    const [ selected, setSelected ] = useState(null);

    const classes = useStyles();

    const onMouseEnter = (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('name'));

        const lectureList = timeTable.tlecture_list.map(t => t.lecture);
        const lecture = lectureList[idx];
        const highlight = lectureToTime(lecture);
        setHighlight(highlight);
    };

    const onMouseLeave = () => {
        setHighlight([]);
    };

    const onDetail = ({currentTarget}) => {
        const idx = parseInt(currentTarget.getAttribute('name'));

        if(selected === idx)
            setSelected(null);
        else
            setSelected(idx);
    }
    const lectureList = timeTable.tlecture_list.map(t => t.lecture);
    const lectures = lectureList.map((lecture, idx) => 
                                <LectureRecord 
                                    key={idx} 
                                    name={idx} 
                                    type='my'
                                    selected={selected===idx} 
                                    onClick={onDetail} 
                                    onMouseEnter={onMouseEnter} 
                                    onMouseLeave={onMouseLeave} 
                                    lecture={lecture}
                                    timeTable ={timeTable}
                                />);

    return (
        <Container className={classes.lectureList}>
                <Container className={classes.titles}>
                    <Typography>학부(과)</Typography>
                    <Typography>과목명</Typography>
                    <Typography>분반</Typography>
                    <Typography>교과구분</Typography>
                    <Typography>학년</Typography>
                    <Typography>학점</Typography>
                    <Typography>교수명</Typography>
                    <Typography>정원</Typography>
                </Container>
                { lectures }
            </Container>
    )
}


const useStyles = makeStyles({
    root: {
        padding: '0'
    },
    lectureList: {
        height: '500px',
        overflow: 'auto',
        padding: '0'
    },
    titles: {
        display: 'flex',
        padding: '0'
    }
})