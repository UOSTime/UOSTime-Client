import React, { useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { timeTableState } from '@states/TimeTable';
import { highLightState } from '@states/TimeTable';
import { semesterState } from '@states/Semester';
import lectureToTime from '@utils/lectureToTime';
import { foregroundColor } from '@utils/styles/Colors';
import useFontStyles from '@utils/styles/Font';
import { uosRed } from '@utils/styles/Colors';
import { requestAPI, API_DELETE_TLECTURE } from '@utils/api';

export const day2Num = {
    '월': 0,
    '화': 1,
    '수': 2,
    '목': 3,
    '금': 4,
}
const timeArr = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TimeTable({timeTableIdx}) {
    const [timeTable, setTimeTable] = useRecoilState(timeTableState(timeTableIdx));
    const highlight = useRecoilValue(highLightState);
    const semester = useRecoilValue(semesterState);

    const previousHighlight = useRef([]);
    const cellRefs = timeArr.map(() => Object.keys(day2Num).map(() => useRef()));

    const classes = useStyles();
    const dayFontClasses = useFontStyles({fontSize: '1rem'});
    const fontClasses = useFontStyles({fontSize: '0.7rem', fontWeight: '700'});
    const colorClass = useLectureColor();
    const sizeClass = useLectureSize();

    const lectureList = timeTable.tlecture_list
        .map(tlecture => tlecture.lecture)
        .filter(lecture => lecture.class_nm !== '')
        .map((lecture, idx) => lectureToTime(lecture, idx))
        .flat();;

    const timeTableMap = timeArr.map(() => Object.keys(day2Num).map(() => null));
    lectureList.forEach(lecture => {
        const row = lecture.times[0] - 1;
        const col = lecture.day;

        timeTableMap[row][col] = lecture;
    });

    const onDelete = async ({target}) => {
        const lectureId = target.getAttribute('name');

        const tlecture = timeTable.tlecture_list
                                    .find(tlecture => tlecture.lecture._id === lectureId);

        if(!tlecture) {
            alert('이미 삭제된 강의입니다.');
            return;
        }
        const tlectureId = tlecture._id;

        // const updatedTimeTable = await requestAPI(API_DELETE_TLECTURE(), {
        //     year: 2021,
        //     term: 'A10',
        //     // year: semester.year,
        //     // term: semester.term,
        //     tLectureId: tlectureId,
        //     timeTableId: timeTableId
        // });

        const updatedTimeTable = {
            ...timeTable,
            tlecture_list: timeTable.tlecture_list.filter(t => t._id !== tlectureId)
        }

        setTimeTable(updatedTimeTable);
    }

    if(highlight !== previousHighlight) {
        previousHighlight.current
            .filter(h => h)
            .filter(h => h.times && h.day!==undefined)
            .forEach(h => {
                const row = h.times[0] - 1;
                const col = h.day;

                cellRefs[row][col].current.innerHTML = cellRefs[row][col].current.innerHTML
                    .replace(`<div class="${sizeClass[h.times.length]} ${colorClass[h.color]} ${classes.lectureBox}"></div>`, '');
            });
    }
    
    if(highlight.length !== 0) {
        previousHighlight.current = highlight;
        highlight
            .filter(h => h)
            .filter(h => h.times && h.day !== undefined)
            .forEach(h => {
            const row = h.times[0] - 1;
            const col = h.day;
            
            cellRefs[row][col].current.innerHTML += 
            `<div class="${sizeClass[h.times.length]} ${colorClass[h.color]} ${classes.lectureBox}"></div>`
        })
    }

    const getLectureBox = (rowIdx, colIdx) => {
        const lecture = timeTableMap[rowIdx][colIdx];
        if(lecture) {
            return (
                <Box className={`${colorClass[lecture.color]} ${sizeClass[lecture.times.length]} ${classes.lectureBox}`}>
                    <button name={lecture.id} className={classes.deleteBtn} onClick={onDelete}>×</button>
                    <Typography className={fontClasses.white}>{lecture.name}</Typography>
                    <Typography className={fontClasses.white}>{lecture.place}</Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Container className={classes.container}>
            <Container className={classes.dayRowContainer}>
                <Box className={classes.timeBox} ></Box>
                {
                    Object.keys(day2Num).map((day, idx) => (
                        <Box key={idx} className={classes.dayBox}>
                            <Typography className={dayFontClasses.white}>
                                {day}
                            </Typography>
                        </Box>
                    ))
                }
            </Container>
            <Container className={classes.timeContainer}>
            { 
                timeArr.map((t, rowIdx) => {
                    return <Container key={rowIdx} className={classes.rowContainer}>
                    { 
                        <Box className={classes.timeBox}>
                            <Typography className={fontClasses.default}>{t}</Typography>
                        </Box> 
                    }
                    {
                        Object.keys(day2Num).map((col, colIdx) => (
                            <Box key={colIdx} className={classes.box} ref={cellRefs[rowIdx][colIdx]}>  
                                { getLectureBox(rowIdx, colIdx) }
                            </Box>)
                        )
                    }
                    </Container>
                })
            }
            </Container>
        </Container>
    );
}

const useStyles = makeStyles({
    container: {
        width: '500px',
        height: '500px',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch'
    },
    timeContainer: {
        height: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch'
    },
    rowContainer: {
        maxHeight: '7.7%',              // TODO - refactoring
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        padding: '0'
    },
    dayRowContainer: {
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        padding: '0',
        backgroundColor: foregroundColor,
        borderRadius: '10px'
    },
    box: {
        flex: '1',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    timeBox: {
        width: '20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    dayBox: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    lectureBox: {
        position: 'absolute',
        width: '95%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '2%',
        zIndex: '10'
    },
    deleteBtn: {
        width: '15px',
        height: '15px',
        lineHeight: '0rem',
        textAlign: 'center',
        position: 'absolute',
        fontWeight: '700',
        fontSize: '1rem',
        zIndex: '11',
        top: '0px',
        right: '0px',
        padding: '0',
        margin: '1px',
        background: 'none',
        color: uosRed,
        border: 'none',
        '&:hover': {
            color: 'white',
            background: uosRed,
            borderRadius: '100px'
        },
        '&:focus': {
            outline: 'none'
        },
        '$lectureBox:not(:hover) &': {
            display: 'none'
        }
    }
});

const useLectureColor = makeStyles({
    0: { backgroundColor: '#9ede73' },
    1: { backgroundColor: '#5CA4A9' },
    2: { backgroundColor: '#E6EBE0' },
    3: { backgroundColor: '#F1AE8B' },
    4: { backgroundColor: '#ED6A5A' },
    5: { backgroundColor: '#ffc2b4' },
    6: { backgroundColor: '#d5ecc2' },
    7: { backgroundColor: '#ff8303' },
    8: { backgroundColor: '#bdc7c9' },
    9: { backgroundColor: '#845460' },
    10: { backgroundColor: '#000000' },
    preview: { backgroundColor: 'gray', opacity: 0.3, position: 'absolute' }
});

const useLectureSize = makeStyles({
    1: { height: '100%'},
    2: { height: '200%'},
    3: { height: '300%'},
    4: { height: '400%'},
    5: { height: '500%'},
    6: { height: '600%'},
    7: { height: '700%'},
    8: { height: '800%'}
})