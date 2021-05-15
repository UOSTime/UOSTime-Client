import React, { useState } from 'react';
import {
  Container,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import LectureListItem from './LectureListItem';

export default function LectureList(props) {
  const {
    lectureList,
    emptyText,
    scrollList,
  } = props;

  const [expandedId, setExpandedId] = useState(null);

  const classes = useStyles();

  const toggleExpand = id => {
    setExpandedId(expandedId === id ? null : id);
  };

  const lectures = lectureList.map(lecture => (
    <LectureListItem
      key={lecture._id}
      type="search"
      lecture={lecture}
      expand={expandedId === lecture._id}
      toggleExpand={toggleExpand}
    />
  ));

  return (
    <>
      <Container className={classes.titles}>
        <Typography className={classes.title_1}>학부(과)</Typography>
        <Typography className={classes.title_2}>과목명</Typography>
        <Typography className={classes.title_3}>분반</Typography>
        <Typography className={classes.title_4}>교수명</Typography>
      </Container>
      <List className={scrollList ? classes.scrollList : null}>
        {lectures.length ? lectures : <Typography>{emptyText}</Typography>}
      </List>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    padding: '0',
  },
  titles: {
    display: 'flex',
    textAlign: 'center',
  },
  title_1: {
    fontSize: '0.8rem',
    width: '35%',
  },
  title_2: {
    fontSize: '0.8rem',
    width: '35%',
  },
  title_3: {
    fontSize: '0.8rem',
    width: '10%',
  },
  title_4: {
    fontSize: '0.8rem',
    width: '20%',
  },
  scrollList: {
    maxHeight: '10em',
    overflow: 'scroll',
  },
});
