import React, { useEffect, useState } from 'react';
import HtmlFromMarkdown from '@components/HtmlFromMarkdown';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import { API_GET_USE_NOTICE, API_GET_HOT_NOTICE, requestAPI } from '@utils/api';
import { convertUTCtoYYYYMMDD } from '@utils/time';
import theme from '@utils/styles/Theme';

function NoticeListItem(props) {
  const classes = useStyles();

  // props
  const {
    notice: {
      title,
      content,
      date,
      is_hot: isHot,
    },
  } = props;

  return (
    <TimelineItem>
      <TimelineOppositeContent className={classes.timelineOppositeContent}>
        <Typography color="textSecondary">{convertUTCtoYYYYMMDD(date)}</Typography>
        {
          isHot && <Typography color="textSecondary">중요 공지</Typography>
        }
      </TimelineOppositeContent>
      <TimelineSeparator className={classes.timelineSeparator}>
        <TimelineDot color="primary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography color="textSecondary" className={classes.timelineDate}>{convertUTCtoYYYYMMDD(date)}</Typography>
        <Typography variant="h2">{title}</Typography>
        <HtmlFromMarkdown markdown={content} />
      </TimelineContent>
    </TimelineItem>
  );
}

export default function Notice() {
  // state
  const [notices, setNotices] = useState([]);

  useEffect(async () => {
    // update notice list
    const noticeList = (await Promise.all([
      requestAPI(API_GET_USE_NOTICE()),
      requestAPI(API_GET_HOT_NOTICE()),
    ])).map(({ data }) => data).flat();

    setNotices(noticeList);
  }, []);

  const noticeList = notices.filter(notice => notice.is_using).map(notice => (
    <NoticeListItem
      key={notice._id}
      notice={notice}
    />
  ));

  return (
    <Container>
      <Typography variant="h1">공지사항</Typography>
      {
        noticeList && (
          noticeList.length
            ? <Timeline align="alternate">{noticeList}</Timeline>
            : <Box>표시할 공지사항 없습니다.</Box>
        )
      }
    </Container>
  );
}

const useStyles = makeStyles({
  timelineOppositeContent: {
    display: 'none',
    flex: 'unset',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  timelineSeparator: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  timelineDate: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});
