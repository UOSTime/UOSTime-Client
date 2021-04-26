import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import HtmlFromMarkdown from '@components/HtmlFromMarkdown';
import CustomDialog from '@components/CustomDialog';
import { API_CREATE_NOTICE, requestAPI } from '@utils/api';
import { convertUTCtoYYYYMMDD, convertYYYYMMDDtoUTC, getUTCNow } from '@utils/time';

export default function AddNoticeDialog(props) {
  // props
  const { open, closeAddNoticeDialog } = props;

  // states
  const [date, setDate] = useState(getUTCNow());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUsing, setIsUsing] = useState(true);
  const [isHot, setIsHot] = useState(false);

  const onSubmit = () => {
    requestAPI(API_CREATE_NOTICE(), {
      title,
      content,
      date,
      is_using: isUsing,
      is_hot: isHot,
    });
  };

  return (
    <CustomDialog
      open={open}
      isForm
      title="공지사항 추가"
      onClose={closeAddNoticeDialog}
      onSubmit={onSubmit}
      submitButtonText="추가"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
              label="내용(markdown)"
              variant="outlined"
              value={content}
              onChange={e => setContent(e.target.value)}
              multiline
              rows={6}
              required
            />
          </FormControl>
          <Box mt={2}>
            <Paper variant="outlined">
              <Box p={2}>
                <HtmlFromMarkdown markdown={content} />
              </Box>
            </Paper>
          </Box>
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
      </Grid>
    </CustomDialog>
  );
}
