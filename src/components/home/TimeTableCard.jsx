import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { timeTableState } from '@states/TimeTable';
import { Card, CardContent, Typography } from '@material-ui/core';
import { currentTimeTableState } from '@states/TimeTable';

export default function TimeTableCard({timeTableIdx, onDelete}) {
    const setCurrentTimeTable = useSetRecoilState(currentTimeTableState);
    const timeTable = useRecoilValue(timeTableState(timeTableIdx));

    const totalCredits = timeTable.tlecture_list
                                .map(tlecture => tlecture.lecture.credit)
                                .reduce((acc, cur) => acc + cur, 0);

    const onClick = () => {
        setCurrentTimeTable(timeTableIdx);
    }

    return (
        <Card onClick={onClick}>
            <CardContent>
                <button name={timeTableIdx} onClick={onDelete}>×</button>
                <Typography>{timeTable.name}</Typography>
                <Typography>{totalCredits}학점</Typography>
            </CardContent>
        </Card>
    )
}