import React from 'react';
import { makeStyles, Container, Box, Typography, Button } from '@material-ui/core';
import { requestAPI, API_ADD_LECTURE_TIMETABLE } from '@utils/api';
import { currentTimeTableState, timeTableState } from '@states/TimeTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusCodes } from 'http-status-codes';

export default function LectureRecord({name, lecture, onMouseEnter, onMouseLeave, onClick, selected}) {
    const currentTimeTable = useRecoilValue(currentTimeTableState);
    const [timeTable, setTimeTable] = useRecoilState(timeTableState(currentTimeTable));

    const classes = useStyles();

    const onAdd = async () => {
        if(timeTable.year !== lecture.year || timeTable.term !== lecture.term) {
            alert('추가하려는 강의가 시간표와 학기가 맞지 않아요..');
        }

        const body = {
            year: timeTable.year,
            term: timeTable.term,
            lectureId: lecture._id,
            timeTableId: timeTable._id
        }
        console.log(body)
        const response = await requestAPI(API_ADD_LECTURE_TIMETABLE(), body);

        if(response.status !== StatusCodes.OK) {
            alert('시간표를 추가하는데 실패했어요...');
            return;
        }

        setTimeTable(response.data);
    };

    return (
        <Container name={name} className={classes.root} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Container name={name} className={classes.simple} onClick={onClick}>
                <Box>{lecture.sub_dept}</Box>
                <Box>{lecture.subject_nm}</Box>
                <Box>{lecture.class_div}</Box>
                <Box>{lecture.subject_div}</Box>
                <Box>{lecture.shyr}</Box>
                <Box>{lecture.credit}</Box>
                <Box>{lecture.prof_nm}</Box>
                <Box>{lecture.tlsn_limit_count}</Box>
            </Container>
            {
                selected ?
                <Container className={classes.detail}>
                    <Box>
                        <Typography>강의시간 및 강의실</Typography>
                        <Typography>{lecture.class_nm}</Typography>
                    </Box>
                    <Box>
                        <Typography>수강정원</Typography>
                        <Typography>{lecture.tlsn_limit_count}</Typography>
                    </Box>
                    <Box>
                        <Typography>타과허용/복수전공</Typography>
                        <Typography>{lecture.etc_permit_yn}/{lecture.sec_permit_yn}</Typography>
                    </Box>
                    <Button onClick={onAdd}>시간표에 추가</Button>
                </Container>
                : null
            }
        </Container>
    )
}


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0'
    },
    simple: {
        display: 'flex',
        padding: '0'
    },
    detail: {
        display: 'flex',
        padding: '0'
    }
})