import React from 'react';
import { makeStyles, Container, Box, Typography, Button } from '@material-ui/core';
import { requestAPI, API_ADD_TLECTURE, API_DELETE_TLECTURE } from '@utils/api';
import { currentTimeTableState, timeTableState } from '@states/TimeTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import useButtonStyles from '@utils/styles/Button';

export default function LectureRecord({name, type, lecture, onMouseEnter, onMouseLeave, onClick, selected}) {
    const currentTimeTable = useRecoilValue(currentTimeTableState);
    const [timeTable, setTimeTable] = useRecoilState(timeTableState(currentTimeTable));

    const classes = useStyles();
    const buttonClasses = useButtonStyles({
        width: '20px',
        fontSize: '0.8rem',
        borderRadius: '10px',
        padding: '0'
    });

    const onAdd = async () => {
        console.log(timeTable)
        console.log(timeTable.year,lecture.year, timeTable.term,lecture.term)
        if(timeTable.year !== lecture.year || timeTable.term !== lecture.term) {
            alert('추가하려는 강의가 시간표와 학기가 맞지 않아요..');
            return;
        }

        const body = {
            year: timeTable.year,
            term: timeTable.term,
            lectureId: lecture._id,
            timeTableId: timeTable._id
        }

        const response = await requestAPI(API_ADD_TLECTURE(), body);

        if(response.status !== StatusCodes.OK) {
            alert('시간표를 추가하는데 실패했어요...');
            return;
        }
        setTimeTable(response.data);
    };

    const onDelete = async () => {
        const tlecture = timeTable.tlecture_list.find(tlecture => tlecture.lecture._id === lecture._id);

        const body = {
            year: timeTable.year,
            term: timeTable.term,
            tLectureId: tlecture._id,
            timeTableId: timeTable._id
        };
        const response = await requestAPI(API_DELETE_TLECTURE(), body);

        if(response.status !== StatusCodes.OK) {
            alert('강의를 버리지 못했어요..');
            return;
        }

        setTimeTable(response.data);
    }

    const addBtn = <Button className={buttonClasses.linearRed} onClick={onAdd}>추가</Button>;
    const deleteBtn = <Button className={buttonClasses.blue} onClick={onDelete}>삭제</Button>;

    return (
        <Container name={name} className={classes.root} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Container name={name} className={classes.simple} onClick={onClick}>
                <Box className={classes.title_1}>{lecture.sub_dept}</Box>
                <Box className={classes.title_2}>{lecture.subject_nm}</Box>
                <Box className={classes.title_3}>{lecture.class_div}</Box>
                <Box className={classes.title_4}>{lecture.prof_nm}</Box>
            </Container>
            {
                selected ?
                <Container className={classes.detail}>
                    <Container className={classes.detailContents}>
                        <Box className={classes.row}>
                            교과구분: {lecture.subject_div}
                        </Box>
                        <Box className={classes.row}>
                            강의시간 및 강의실: {lecture.class_nm}
                        </Box>
                        <Box className={classes.row}>
                            수강정원: {lecture.tlsn_limit_count}
                        </Box>
                        <Box className={classes.row}>
                            학년: {lecture.shyr}
                        </Box>
                        <Box className={classes.row}>
                            학점: {lecture.credit}
                        </Box>
                        <Box className={classes.row}>
                            수강정원: {lecture.tlsn_limit_count}
                        </Box>
                        <Box className={classes.row}>
                            타과허용/복수전공: {lecture.etc_permit_yn}/{lecture.sec_permit_yn}
                        </Box>
                    </Container>
                    { type==='search' ? addBtn : deleteBtn}
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
        height: '1.7rem',
        display: 'flex',
        padding: '0',
        textAlign: 'center'
    },
    detail: {
        display: 'flex'
    },
    detailContents: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        fontSize: '0.7rem',
        display: 'flex'
    },
    title_1: {
        fontSize: '0.7rem',
        fontWeight: '600',
        width: '35%'
    },
    title_2: {
        fontSize: '0.7rem',
        fontWeight: '600',
        width: '35%'
    },
    title_3: {
        fontSize: '0.7rem',
        fontWeight: '600',
        width: '10%'
    },
    title_4: {
        fontSize: '0.7rem',
        fontWeight: '600',
        width: '20%'
    },
})