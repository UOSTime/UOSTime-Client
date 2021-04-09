import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import NoticeList from './NoticeList';
import AddNoticeDialog from './AddNoticeDialog';

export default function Admin() {
  const [isOpenAddNoticeDialog, setIsOpenAddNoticeDialog] = useState(false);

  const openAddNoticeDialog = () => {
    setIsOpenAddNoticeDialog(true);
  };

  const closeAddNoticeDialog = () => {
    setIsOpenAddNoticeDialog(false);
  };

  const sortSemesterOrHistory = (a, b) => {
    if (a.year < b.year) return 1;
    if (a.year > b.year) return -1;
    if (a.term < b.term) return 1;
    if (a.term > b.term) return -1;
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  };

  return (
    <Container>
      <AddNoticeDialog
        open={isOpenAddNoticeDialog}
        closeAddNoticeDialog={closeAddNoticeDialog}
      />

      <a href="/"><strong>UOSTime</strong></a>
      <h1>Admin Page</h1>

      <Button variant="contained" color="primary" onClick={openAddNoticeDialog}>Add Notice</Button>

      <h2>Notices</h2>
      <NoticeList />
    </Container>
  );
}
