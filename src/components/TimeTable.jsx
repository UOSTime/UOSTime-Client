import { Box, Container } from '@material-ui/core';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { timeTableMapState } from '../states/TimeTable';

const day2Num = {
    '월': 0,
    '화': 1,
    '수': 2,
    '목': 3,
    '금': 4,
    '토': 5,
    '일': 6
}

export default function TimeTable({timeTableId}) {
    const timeTable = useRecoilValue(timeTableMapState)[timeTableId];

    const lectureInfoList = timeTable.tlecture_list
                            .map(tlecture => tlecture.lecture)
                            .map(lecture => {
                                const name = lecture.subject_nm;

                                const dayStrings = lecture.class_nm.split(', ');

                                const lectureInfos = dayStrings.map(dayStr => {
                                    const parts = dayStr.split('/');
                                    const time = parts[0];
                                    const place = parts.slice(1).join('/');

                                    const day = day2Num[time.charAt(0)];
                                    const times = time.substring(1).split(',').map(t => parseInt(t));

                                    return { day, times, place, name };
                                })

                                return lectureInfos;
                            }).flat();


    return (
        <div>

        </div>
    );
}

function TimeTableBlock({lectureInfo}) {

    return (
        <Box>
            {lectureInfo.name}
            {lectureInfo.place}
        </Box>
    )
}