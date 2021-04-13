import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useRef, ReactDOM } from 'react';
import { useRecoilValue } from 'recoil';
import { timeTableMapState } from '@states/TimeTable';
import { foregroundColor } from '@utils/styles/Colors';
import useFontStyles from '@utils/styles/Font';

const day2Num = {
    '월': 0,
    '화': 1,
    '수': 2,
    '목': 3,
    '금': 4,
}
const timeArr = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TimeTable({timeTableId}) {
    const timeTable = useRecoilValue(timeTableMapState)[timeTableId];
    const cellRefs = timeArr.map(() => Object.keys(day2Num).map(() => useRef()));
    const lectureInfoList = useRef([]);

    const classes = useStyles();
    const dayFontClasses = useFontStyles({fontSize: '1rem'});
    const fontClasses = useFontStyles({fontSize: '0.7rem'});
    const colorClass = useLectureColor();
    const sizeClass = useLectureSize();

    

    useEffect(() => {
        lectureInfoList.current = timeTable.tlecture_list
            .map(tlecture => tlecture.lecture)
            .filter(lecture => lecture.class_nm !== '')
            .map((lecture, idx) => {
                const name = lecture.subject_nm;
                
                const dayStrings = lecture.class_nm.split(', ');

                const lectureInfos = dayStrings.map(dayStr => {
                    const parts = dayStr.split('/');
                    const time = parts[0];
                    const place = parts.slice(1).join('/');

                    const day = day2Num[time.charAt(0)];
                    const times = time.substring(1).split(',').map(t => parseInt(t));
                    const color = String(idx);

                    return { day, times, place, name, color };
                })

                return lectureInfos;
            }).flat();

            lectureInfoList.current.forEach(lectureInfo => {
                const row = lectureInfo.times[0]-1;
                const col = lectureInfo.day;
                console.log(colorClass['0'])

                const content = <Container>
                    { lectureInfo.name }
                    { lectureInfo.place }
                </Container>

                console.log(cellRefs[row][col].current.children[0])
                // cellRefs[row][col].current.children[0] = content;
                cellRefs[row][col].current.classList.add(
                    colorClass[lectureInfo.color], 
                    sizeClass[lectureInfo.times.length], 
                    classes.lectureBox
                );
            })
    }, [timeTable]);
    
    
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
                            <Box key={colIdx} className={classes.box}>                                
                                <Box ref={cellRefs[rowIdx][colIdx]}></Box>
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

// function TimeTableBlock({lectureInfo}) {
//     const classes = useBoxBlockStyles({height: `${lectureInfo.current.times.length * 100}%`});
//     const fontClasses = useFontStyles({fontSize: '0.8rem', textAlign: 'center'});

//     return (
//         <Box className={classes.root}>
//             <Typography className={fontClasses.white}>{lectureInfo.current.name}</Typography>
//             <Typography className={fontClasses.white}>{lectureInfo.current.place}</Typography>
//         </Box>
//     )
// }


const useBoxBlockStyles = makeStyles({
    root: styles => ({
        backgroundColor: 'green',
        height: '100%',
        position: 'absolute',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3px',
        ...styles
    })
});

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
        position: 'relative'
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
    10: { backgroundColor: '#9ede73' },
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