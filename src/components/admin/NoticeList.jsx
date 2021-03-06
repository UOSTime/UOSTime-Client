import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, Grid, Switch, TextField, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { API_DELETE_NOTICE, API_GET_ALL_NOTICES, API_UPDATE_NOTICE, requestAPI } from '@utils/api';
import { convertUTCtoYYYYMMDD, convertYYYYMMDDtoUTC } from '@utils/time';

function NoticeListItem(props) {
  // props
  const {
    notice,
    accordionIndex,
    onChange,
    expanded,
  } = props;

  // state
  const [isEdited, setIsEdited] = useState(false);
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const [date, setDate] = useState(notice.date);
  const [isHot, setIsHot] = useState(notice.is_hot);
  const [isUsing, setIsUsing] = useState(notice.is_using);

  useEffect(() => {
    setIsEdited(title !== notice.title
      || content !== notice.content
      || date !== notice.date
      || isHot !== notice.is_hot
      || isUsing !== notice.is_using);
  }, [title, content, date, isHot, isUsing]);

  const deleteNotice = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      requestAPI(API_DELETE_NOTICE, { _id: notice._id });
    }
  };

  const updateNotice = () => {
    notice.title = title;
    notice.content = content;
    notice.date = date;
    notice.is_hot = isHot;
    notice.is_using = isUsing;
    requestAPI(API_UPDATE_NOTICE, notice);
  };

  return (
    <Accordion expanded={expanded} onChange={() => onChange(accordionIndex)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`notice-content-${accordionIndex}`}
        id={`notice-${accordionIndex}`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="날짜"
                type="date"
                value={convertUTCtoYYYYMMDD(date)}
                onChange={e => setDate(convertYYYYMMDDtoUTC(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth>
              <TextField
                label="제목"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="내용"
                variant="outlined"
                value={content}
                onChange={e => setContent(e.target.value)}
                multiline
                rows={6}
                required
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={isHot}
                    onChange={e => setIsHot(e.target.checked)}
                    name="isHot"
                    color="primary"
                  />
                )}
                label={isHot ? '중요 공지' : '일반 공지'}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={isUsing}
                    onChange={e => setIsUsing(e.target.checked)}
                    name="isUsing"
                    color="primary"
                  />
                )}
                label={isUsing ? '즉시 공개' : '비공개'}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={deleteNotice}>삭제</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={updateNotice} disabled={!isEdited}>저장</Button>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default function NoticeList(props) {
  // state
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    updateNoticeList();
  }, []);

  const updateNoticeList = async () => {
    const allNotices = await requestAPI(API_GET_ALL_NOTICES);
    setNotices(allNotices);
  };

  // state
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = i => {
    setExpandedIndex(i === expandedIndex ? null : i);
  };

  const noticeList = notices.map((notice, i) => (
    <NoticeListItem
      key={notice.title}
      notice={notice}
      accordionIndex={i}
      onChange={toggleExpand}
      expanded={expandedIndex === i}
    />
  ));

  return (
    <>
      {noticeList}
    </>
  );
}
