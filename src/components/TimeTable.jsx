import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
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

export default function TimeTable({timeTableId}) {
    const timeTable = useRecoilValue(timeTableMapState)[timeTableId];

    const classes = useStyles();
    const dayFontClasses = useFontStyles({fontSize: '1rem'});
    const fontClasses = useFontStyles({fontSize: '0.7rem'})

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

    const getTimeTableBlock = (rowIdx, colIdx, lectureInfoList) => {
        const lecture = lectureInfoList.find(lectureInfo => 
            lectureInfo.times[0]===(rowIdx+1) && lectureInfo.day===colIdx
        );
        if(!lecture) return null;
    
        return <TimeTableBlock lectureInfo={lecture} />
    }
    
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
                [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                    .map((t, rowIdx) => {
                        return <Container key={rowIdx} className={classes.rowContainer}>
                        { 
                            <Box className={classes.timeBox}>
                                <Typography className={fontClasses.default}>{t}</Typography>
                            </Box> 
                        }
                        {
                            Object.keys(day2Num).map((col, colIdx) => {
                                return (
                                    <Box key={colIdx} className={classes.box}>
                                    { getTimeTableBlock(rowIdx, colIdx, lectureInfoList) }
                                    </Box>);
                            })
                        }
                        </Container>
                    })
            }
            </Container>
        </Container>
    );
}

function TimeTableBlock({lectureInfo}) {
    const classes = useBoxBlockStyles({height: `${lectureInfo.times.length * 100}%`});
    const fontClasses = useFontStyles({fontSize: '0.8rem', textAlign: 'center'});

    return (
        <Box className={classes.root}>
            <Typography className={fontClasses.white}>{lectureInfo.name}</Typography>
            <Typography className={fontClasses.white}>{lectureInfo.place}</Typography>
        </Box>
    )
}


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
        textAlign: 'end',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dayBox: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
})