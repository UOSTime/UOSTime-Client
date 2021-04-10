import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Switch, TextField } from '@material-ui/core';
import { getUniqueID } from '@utils/id';
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

  // id
  const [
    dialogTitleID,
  ] = getUniqueID(1);

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
    <Dialog open={open} onClose={closeAddNoticeDialog} aria-labelledby={dialogTitleID}>
      <DialogTitle id={dialogTitleID}>공지사항 추가</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddNoticeDialog} color="secondary">취소</Button>
          <Button color="primary" type="submit">추가</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
