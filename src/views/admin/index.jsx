import React from 'react';
import { Box, Container, Link } from '@material-ui/core';
import NoticeList from './NoticeList';
import SemesterList from './SemesterList';

export default function Admin() {
  return (
    <Container>
      <Box my={3}>
        <Link href="/">홈으로 돌아가기</Link>
        <h1>관리자 페이지</h1>
        <NoticeList />
        <SemesterList />
      </Box>
    </Container>
  );
}
