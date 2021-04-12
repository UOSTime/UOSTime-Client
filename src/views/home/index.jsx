import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { semesterState } from '@states/Semester';
import TimeTable from '@components/TimeTable';
import { requestAPI, API_GET_TIMETABLES } from '@utils/api';
import { StatusCodes } from 'http-status-codes';
import { timeTableMapState } from '@states/TimeTable';

export default function Home() {
    const [ timeTableMap, setTimeTableMap ] = useRecoilState(timeTableMapState);
    const semester = useRecoilValue(semesterState);

    useEffect(() => {
        const getTimeTables = async () => {
            const response = await requestAPI(API_GET_TIMETABLES().setQuery({year: semester.year, term: semester.term}));

            if(!response || response.status !== StatusCodes.OK) {
                alert('시간표를 가져오는데 실패했어요');
                return null;
            }

            const timeTables = {};
            response.data.forEach(timeTable => timeTables[timeTable._id] = timeTable);

            setTimeTableMap(timeTables);
        };

        getTimeTables();
    }, []);

    const timeTableComponents = Object.keys(timeTableMap).map((timeTableId, idx) => <TimeTable key={idx} timeTableId={timeTableId} />)

    return (
        <div>
            { timeTableComponents }
        </div>
    )
}