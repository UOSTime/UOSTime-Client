import React from 'react';
import { Container } from '@material-ui/core';
import NoticeList from './NoticeList';
import SemesterList from './SemesterList';

export default function Admin() {
  return (
    <Container>
      <a href="/"><strong>UOSTime</strong></a>
      <h1>Admin Page</h1>
      <NoticeList />
      <SemesterList />
    </Container>
  );
}
