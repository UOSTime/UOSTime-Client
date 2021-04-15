import React from 'react';
import { makeStyles, Container, Box, Typography } from '@material-ui/core';

export default function LectureRecord({name, lecture, onMouseEnter, onMouseLeave, onClick, selected}) {
    const classes = useStyles();

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