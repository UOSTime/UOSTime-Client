import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Redirect } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StatusCodes } from 'http-status-codes';
import TimeTable from '@components/home/TimeTable';
import LectureList from '@components/home/LectureList';
import { semesterState } from '@states/Semester';
import { timeTableState, currentTimeTableState } from '@states/TimeTable';
import {
  requestAPI,
  API_GET_TIMETABLES,
  API_CREATE_TIMETABLE,
  API_DELETE_TIMETABLE,
  API_PATCH_TIMETABLE_NAME,
} from '@utils/api';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import MyLectureList from '@components/home/MyLectureList';
import TimeTableCard from '@components/home/TimeTableCard';
import CreateTimeTable from '@components/home/CreateTimeTable';
import useButtonStyles from '@utils/styles/Button';

export default function Home() {
  // const semester = useRecoilValue(semesterState);
  const semester = {
    year: 2021,
    term: 'A10',
  };
  const [currentTimeTable, setCurrentTimeTable] = useRecoilState(
    currentTimeTableState
  );
  const timeTableStates = [0, 1, 2, 3].map((idx) => {
    const [value, set] = useRecoilState(timeTableState(idx));
    return { value, set };
  });

  const [tableName, setTableName] = useState('');
  const [isChangeName, setIsChangeName] = useState(false);
  const [type, setType] = useState('main');

  const classes = useStyles();
  const buttonClasses = useButtonStyles({
    width: '30px',
    height: '33px',
    fontSize: '0.8rem !important',
    padding: '0',
    margin: '0px 2px 0px 2px',
    borderRadius: '5px',
  });

  useEffect(() => {
    if (!localStorage.getItem('userID')) {
      return;
    }

    const getTimeTables = async () => {
      const response = await requestAPI(
        API_GET_TIMETABLES().setQuery({
          year: semester.year,
          term: semester.term,
        })
      );

      if (!response || response.status !== StatusCodes.OK) {
        alert('시간표를 가져오는데 실패했어요');
        return;
      }

      const timeTables = response.data;
      timeTables.sort((a, b) =>
        dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1
      );
      timeTables.forEach((timeTable, idx) => {
        timeTableStates[idx].set(timeTable);
      });

      if (timeTables.length) {
        setCurrentTimeTable(0);
      }
    };

    getTimeTables();
  }, []);

  const onChangeNameField = ({ target }) => {
    setTableName(target.value);
  };

  const onSwitch = () => {
    setType(type === 'search' ? 'my' : 'search');
  };

  const onChangeName = () => {
    setIsChangeName(true);
    setTableName(timeTableStates[currentTimeTable].value.name);
  };

  const onTableNameEnter = (e) => {
    if (e.key == 'Enter') {
      onSubmitName();
    }
  };

  const onSubmitName = async () => {
    const timeTable = timeTableStates[currentTimeTable].value;

    const body = {
      year: timeTable.year,
      term: timeTable.term,
      name: tableName,
      timeTableId: timeTable._id,
    };

    const response = await requestAPI(API_PATCH_TIMETABLE_NAME(), body);

    if (response.status !== StatusCodes.OK) {
      alert('시간표 명을 변경하지 못 했어요...');
      return;
    }
    timeTableStates[currentTimeTable].set(response.data);
    setIsChangeName(false);
  };

  const onCancelName = () => {
    setIsChangeName(false);
  };

  const onCreate = async () => {
    const body = {
      year: semester.year,
      term: semester.term,
      name: '시간표',
    };

    const response = await requestAPI(API_CREATE_TIMETABLE(), body);

    if (response.status !== StatusCodes.CREATED) {
      alert('시간표 생성에 실패했어요...');
      return;
    }
    const nextIdx = timeTableStates.filter(
      (timeTable) => timeTable.value && timeTable.value._id !== null
    ).length;

    const newTimeTable = response.data;
    timeTableStates[nextIdx].set(newTimeTable);

    if (nextIdx === 0) {
      setCurrentTimeTable(0);
    } else {
      setCurrentTimeTable(nextIdx);
    }
  };

  const onSearchMode = () => {
    setType('search');
  };

  const onMyMode = () => {
    setType('my');
  };

  const onMainMode = () => {
    setType('main');
  };

  const onDelete = async ({ target }) => {
    const timeTableIdx = parseInt(target.getAttribute('name'));
    const timeTableId = timeTableStates[timeTableIdx].value._id;

    const response = await requestAPI(
      API_DELETE_TIMETABLE()
        .setPathParam(timeTableId)
        .setQuery({ year: semester.year, term: semester.term })
    );

    if (response.status !== StatusCodes.NO_CONTENT) {
      alert('시간표를 삭제하지 못했어요...');
      return;
    }

    const maxNum = timeTableStates.filter(
      (state) => state.value && state.value._id !== null
    ).length;

    if (currentTimeTable === timeTableIdx) {
      if (maxNum === 1) {
        setCurrentTimeTable(null);
      } else {
        setCurrentTimeTable(currentTimeTable - 1);
      }
    }

    for (let i = timeTableIdx + 1; i < maxNum; i++) {
      timeTableStates[i - 1].set(timeTableStates[i].value);
    }
    timeTableStates[maxNum - 1].set({
      _id: null,
      uid: null,
      name: null,
      year: null,
      term: null,
      tlecture_list: [],
      createAt: [],
      updateAt: [],
      __v: null,
    });
  };

  let title = null;
  if (timeTableStates[currentTimeTable]) {
    if (isChangeName) {
      title = (
        <Container className={classes.tableNameChangeContainer}>
          <input
            className={classes.tableNameInput}
            onChange={onChangeNameField}
            value={tableName}
            onKeyPress={onTableNameEnter}
          />
          <Button className={buttonClasses.linearRed} onClick={onSubmitName}>
            변경
          </Button>
          <Button className={buttonClasses.blue} onClick={onCancelName}>
            취소
          </Button>
        </Container>
      );
    } else {
      title = (
        <Button className={classes.tableNameBtn} onClick={onChangeName}>
          {timeTableStates[currentTimeTable].value.name}
        </Button>
      );
    }
  }

  const mainTimeTable = <TimeTable timeTableIdx={currentTimeTable} />;
  const timeTableComponents = timeTableStates
    .filter((timeTable) => timeTable.value && timeTable.value._id !== null)
    .map((_, idx) => (
      <TimeTableCard key={idx} timeTableIdx={idx} onDelete={onDelete} />
    ));

  if (!localStorage.getItem('userID')) {
    return <Redirect to="/login" />;
  }

  const lecturePanel = (content) => {
    return (
      <Container className={classes.sideBarPanel}>
        <Container className={classes.lectureTop}>
          <Button onClick={onSwitch}>
            {type === 'search' ? '내 강의' : '강의 검색'}
          </Button>
          <Button onClick={onMainMode}>×</Button>
        </Container>
        {content}
      </Container>
    );
  };

  const sideBar = {
    search: lecturePanel(<LectureList />),
    my: lecturePanel(<MyLectureList />),
    main: (
      <Container className={classes.sideBarPanel}>
        {timeTableComponents}
        {timeTableComponents.length < 4 ? (
          <CreateTimeTable onClick={onCreate} />
        ) : null}
      </Container>
    ),
  };

  const addBtn = timeTableStates.filter(
    (timeTable) => timeTable.value && timeTable.value._id !== null
  ).length ? (
    type === 'main' ? (
      <Button onClick={onSearchMode}>+</Button>
    ) : (
      <Button onClick={onMainMode}>×</Button>
    )
  ) : null;

  return (
    <Container className={classes.root}>
      <Container className={classes.timeTablePanel}>
        <Container className={classes.timeTableTitle}>
          {title}
          <Container className={classes.timeTableTitleUtils}>
            {addBtn}
          </Container>
        </Container>
        {mainTimeTable}
      </Container>
      {sideBar[type]}
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  timeTablePanel: {
    padding: '0',
  },
  timeTableTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0px 10px 0px',
    '& button': {
      fontSize: '1.5rem',
      padding: '0',
      lineHeight: '1.5rem',
    },
  },
  timeTableTitleUtils: {
    width: '70px',
    margin: '0',
    padding: '0',
  },
  tableNameChangeContainer: {
    width: '300px',
    display: 'flex',
    padding: '0',
    margin: '0',
  },
  sideBarPanel: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
    padding: '0',
  },
  lectureTop: {},
  tableNameBtn: {
    fontSize: '1.5rem',
    '& span': {
      lineHeight: '1.5rem',
    },
  },
  tableNameInput: {
    fontSize: '1.5rem',
    width: '60%',
  },
});
