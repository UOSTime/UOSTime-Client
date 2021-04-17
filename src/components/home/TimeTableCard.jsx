import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { timeTableState } from '@states/TimeTable';
import { CardContent, Container, makeStyles, Typography } from '@material-ui/core';
import { currentTimeTableState } from '@states/TimeTable';
import { uosRed } from '@utils/styles/Colors';

export default function TimeTableCard({timeTableIdx, onDelete}) {
    const setCurrentTimeTable = useSetRecoilState(currentTimeTableState);
    const timeTable = useRecoilValue(timeTableState(timeTableIdx));

    const classes = useStyles();

    const totalCredits = timeTable.tlecture_list
                                .map(tlecture => tlecture.lecture.credit)
                                .reduce((acc, cur) => acc + cur, 0);

    let majorCredit = 0;
    let cultureCredit = 0;
    let majorCnt = 0;
    let cultureCnt = 0;
    timeTable.tlecture_list
            .map(t => t.lecture)
            .forEach(lecture => {
                const div = lecture.subject_div.substring(0, 2);
                if(div === '교양') {
                    cultureCnt++;
                    cultureCredit += lecture.credit
                } else if(div === '전공') {
                    majorCnt++;
                    majorCredit += lecture.credit
                }
            })

    const onClick = () => {
        setCurrentTimeTable(timeTableIdx);
    }

    return (
        <Container className={classes.root} onClick={onClick}>
            <CardContent>
                <button className={classes.deleteBtn} name={timeTableIdx} onClick={onDelete}>×</button>
                <Typography className={classes.title}>{timeTable.name}</Typography>
                <Typography className={classes.credit}>{totalCredits}학점</Typography>
                <Typography className={classes.detail}>전공: {majorCredit}학점({majorCnt}과목)</Typography>
                <Typography className={classes.detail}>전공: {cultureCredit}학점({cultureCnt}과목)</Typography>
            </CardContent>
        </Container>
    )
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '24%',
        marginBottom: '1%',
        padding: '0',
        borderRadius: '20px',
        boxSizing: 'border-box',
        border: `10px solid ${uosRed}`,
        position: 'relative'
    },
    deleteBtn: {
        position: 'absolute',
        top: '0',
        right: '0',
        fontSize: '1.5rem',
        background: 'none',
        border: 'none',
        '$root:not(:hover) &': {
            display: 'none'
        }
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '700',
    },
    credit: {
        fontSize: '0.7rem'
    },
    detail: {
        fontSize: '0.7rem'
    }
})