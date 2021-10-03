import React, { useState } from 'react';
import {
  Container,
  List,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import LectureListItem from './LectureListItem';

const Titles = () => {
  const classes = useStyles();

  return (
    <Container className={classes.titles}>
      <Typography className={classes.title_1}>학부(과)</Typography>
      <Typography className={classes.title_2}>과목명</Typography>
      <Typography className={classes.title_3}>분반</Typography>
      <Typography className={classes.title_4}>교수명</Typography>
    </Container>
  );
};

const ListBody = props => {
  const {
    lectureList,
    emptyText,
    type,
  } = props;

  const [expandedId, setExpandedId] = useState(null);
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {lectureList.length
        ? lectureList.map(lecture => (
          <LectureListItem
            key={lecture._id}
            type={type}
            lecture={lecture}
            expand={expandedId === lecture._id}
            setExpandedId={setExpandedId}
          />
        ))
        : <Typography className={classes.emptyListMessage}>{emptyText}</Typography>}
    </List>
  );
};

export default function LectureList(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Titles />
      <ListBody {...props} />
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    flexGrow: '1',
    borderRadius: '1em',
    overflow: 'hidden',
  },
  titles: {
    display: 'flex',
    textAlign: 'center',
    padding: '0.5em 1em',
    borderBottom: '1px solid #EAEAEA',
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
  list: {
    padding: '0',
    overflow: 'scroll',
  },
  emptyListMessage: {
    padding: '1em',
    textAlign: 'center',
    opacity: '0.5',
  },
});
