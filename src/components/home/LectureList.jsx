import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import { Button, Container, makeStyles, Typography, Select } from '@material-ui/core';
import { currentTimeTableState, timeTableState, highLightState } from '@states/TimeTable';
import { semesterState } from '@states/Semester';
import LectureRecord from '@components/home/LectureRecord';
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';
import UosInput from '@components/UosInput';
import lectureToTime from '@utils/lectureToTime';
import useButtonStyles from '@utils/styles/Button';
import { uosRed } from '@utils/styles/Colors';

const searchOption = {
    sub_dept: '학과/학부',
    subject_div: '과목구분',
    subject_div2: '세부과목',
    subject_no: '과목번호',
    subject_nm: '과목명',
    shyr: '학년',
    credit: '학점',
    prof_nm: '교수명'
}
const scrollSize = 50;

export default function LectureList() {
    const semester = useRecoilValue(semesterState);
    const setHighlight = useSetRecoilState(highLightState);
    const currentTimeTable = useRecoilValue(currentTimeTableState);
    const [ timeTable, setTimeTable ] = useRecoilState(timeTableState(currentTimeTable));

    const [ lectureList, setLectureList ] = useState([]);
    const [ input, setInput ] = useState({searchType: 'subject_nm', keyword: ''});
    const [ selected, setSelected ] = useState(null);

    const scrollContainer = useRef();
    const searchBtn = useRef();
    const allLectures = useRef([]);

    const classes = useStyles();
    const buttonClasses = useButtonStyles({
        width: '60px',
        height: '32px',
        fontSize: '0.8rem',
        padding: '0',
        borderRadius: '5px'
    });

    const onMouseEnter = (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('name'));
        const lecture = lectureList[idx];
        const highlight = lectureToTime(lecture);
        setHighlight(highlight);
    };

    const onMouseLeave = () => {
        setHighlight([]);
    };

    const onDetail = ({currentTarget}) => {
        const idx = parseInt(currentTarget.getAttribute('name'));

        if(selected === idx)
            setSelected(null);
        else
            setSelected(idx);
    }

    const onSearch = async () => {
        const query = {
            year: 2021,
            term: 'A10'
            // year: semester.year,
            // term: semester.term
        }
        if(input.keyword) {
            query.searchType = input.searchType;
            query.keyword = input.keyword;
        }
        const response = await requestAPI(API_GET_ALL_LECTURES().setQuery(query));

        if(!response) {
            alert('검색 도중 문제가 발생했어요.');
        }
        if(response.status === StatusCodes.OK) {
            allLectures.current = response.data;

            setLectureList(allLectures.current.slice(0, scrollSize));
        } else {
            alert(response.data);
        }
    };

    const handleScroll = (e) => {
        const scrollY = scrollContainer.current.scrollHeight;
        const scrollTop = scrollContainer.current.scrollTop;
        const clientHeight = scrollContainer.current.clientHeight;

        if (scrollTop + clientHeight >= scrollY-200) {
            const currentLength = lectureList.length;
            setLectureList(lectureList.concat(allLectures.current.slice(currentLength, currentLength+scrollSize)));
        }
    };
    
    const onEnter = (e) => {
        if (e.key === 'Enter') {
            searchBtn.current.click();
        };
    }

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        });
    }
    
    const lectures = lectureList.map((lecture, idx) => 
                                <LectureRecord 
                                    key={idx} 
                                    name={idx} 
                                    type='search'
                                    selected={selected===idx} 
                                    onClick={onDetail} 
                                    onMouseEnter={onMouseEnter} 
                                    onMouseLeave={onMouseLeave} 
                                    lecture={lecture}
                                    timeTable ={timeTable}
                                />);

    return (
        <Container className={classes.root}>
            <Container className={classes.searchBar}>
                <Select className={classes.select} name='searchType' native value={input.searchType} onChange={onChange}>
                    {Object.entries(searchOption).map(([code, name], idx) => <option key={idx} value={code}>{name}</option>)}
                </Select>
                <UosInput name='keyword' onKeyPress={onEnter} onChange={onChange} value={input.keyword} />
                <Button className={buttonClasses.linearRed} onClick={onSearch} ref={searchBtn}>검색</Button>
            </Container>
            <Container className={classes.lectureList} onScroll={handleScroll} ref={scrollContainer}>
                <Container className={classes.titles}>
                    <Typography className={classes.title_1}>학부(과)</Typography>
                    <Typography className={classes.title_2}>과목명</Typography>
                    <Typography className={classes.title_3}>분반</Typography>
                    <Typography className={classes.title_4}>교수명</Typography>
                </Container>
                { lectures }
            </Container>
        </Container>
    )
}



const useStyles = makeStyles({
    root: {
        height: '800px',
        padding: '0'
    },
    lectureList: {
        height: '100%',
        overflow: 'auto',
        padding: '0'
    },
    searchBar: {
        padding: 0
    },
    titles: {
        display: 'flex',
        padding: '0',
        textAlign: 'center',
        height: '1.7rem',
    },
    title_1: {
        fontSize: '0.8rem',
        fontWeight: '700',
        width: '35%'
    },
    title_2: {
        fontSize: '0.8rem',
        fontWeight: '700',
        width: '35%'
    },
    title_3: {
        fontSize: '0.8rem',
        fontWeight: '700',
        width: '10%'
    },
    title_4: {
        fontSize: '0.8rem',
        fontWeight: '700',
        width: '20%'
    },
    select: {
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottom: `2px solid ${uosRed} !important`,
        },  
        '&:after': {
            borderBottom: `2px solid ${uosRed}`
        }
    }
})