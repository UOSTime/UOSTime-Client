import { useRecoilValue } from 'recoil';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Container, makeStyles, Select, TextField } from '@material-ui/core';
import { semesterState } from '@states/Semester';
import { requestAPI, API_GET_ALL_LECTURES } from '@utils/api';
import { StatusCodes } from 'http-status-codes';

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
    const [ lectureList, setLectureList ] = useState([]);
    const [ input, setInput ] = useState({searchType: 'subject_nm', keyword: ''});
    const lectureListComponent = useRef();
    const allLectures = useRef([]);

    const classes = useStyles();

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
        const scrollY = lectureListComponent.current.scrollHeight;
        const scrollTop = lectureListComponent.current.scrollTop;
        const clientHeight = lectureListComponent.current.clientHeight;
        console.log(scrollY, scrollTop, clientHeight)

        if (scrollTop + clientHeight >= scrollY-200) {
            const currentLength = lectureList.length;
            setLectureList(lectureList.concat(allLectures.current.slice(currentLength, currentLength+scrollSize)));
        }
       };
    

    const onChange = (e) => {
        const {name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        });
    }
    
    return (
        <Container>
            <select name='searchType' onChange={onChange} value={input.searchType}>
                {Object.entries(searchOption).map(([code, name], idx) => <option key={idx} value={code}>{name}</option>)}
            </select>
            <TextField name='keyword' onChange={onChange} value={input.keyword}></TextField>
            <Button onClick={onSearch}>검색</Button>
            <Container className={classes.lectureList} onScroll={handleScroll} ref={lectureListComponent}>
                { lectureList.map((lecture, idx) => <LectureRecord key={idx} lecture={lecture} />)}
            </Container>
        </Container>
    )
}

function LectureRecord({lecture}) {
    const classes = useLectureRecordStyles();
    
    return (
        <Container className={classes.root}>
            <Box>{lecture.sub_dept}</Box>
            <Box>{lecture.subject_nm}</Box>
            <Box>{lecture.class_div}</Box>
            <Box>{lecture.subject_div}</Box>
            <Box>{lecture.shyr}</Box>
            <Box>{lecture.credit}</Box>
            <Box>{lecture.prof_nm}</Box>
            <Box>{lecture.tlsn_limit_count}</Box>
        </Container>
    )
}

const useLectureRecordStyles = makeStyles({
    root: {
        display: 'flex'
    }
})

const useStyles = makeStyles({
    lectureList: {
        width: '500px',
        height: '500px',
        overflow: 'auto',
        
    }
})