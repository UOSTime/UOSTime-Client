import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { API_UPDATE_LECTURES, API_GET_HISTORIES, requestAPI } from '@utils/api';
import { getUniqueID } from '@utils/id';
import { getTermsAsArray } from '@utils/semester';
import { getToday } from '@utils/time';
import CustomTable from '@components/CustomTable';

export default function SemesterList() {
  const today = getToday();

  // id
  const [
    termSelectLabelId,
  ] = getUniqueID(1);

  // state
  const [updateHistories, setUpdateHistories] = useState([]);
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedTerm, setSelectedTerm] = useState('A10');

  useEffect(async () => {
    // show update histories
    const { data: histories } = await requestAPI(API_GET_HISTORIES({
      year: selectedYear,
      term: selectedTerm,
      page: 1, // TODO: make it selectable
    }));
    setUpdateHistories(histories);
  }, [selectedYear, selectedTerm]);

  const updateLectures = () => {
    requestAPI(API_UPDATE_LECTURES({
      year: selectedYear,
      term: selectedTerm,
    }));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" p={2}>
        <Box mr="auto">
          <h2>강의 업데이트</h2>
        </Box>
        <Box mx={1}>
          <TextField
            label="연도"
            type="number"
            defaultValue={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          />
        </Box>
        <Box mx={1}>
          <FormControl>
            <InputLabel id={termSelectLabelId}>학기</InputLabel>
            <Select
              labelId={termSelectLabelId}
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value)}
            >
              {getTermsAsArray().map(({ code, name }) => (
                <MenuItem key={code} value={code}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mx={1}>
          <Button variant="contained" color="primary" onClick={() => updateLectures()}>업데이트</Button>
        </Box>
      </Box>
      <CustomTable
        columns={[
          ['관리자', ['by', 'name']],
          ['신규', ['createCnt']],
          ['삭제', ['deleteCnt']],
          ['변경', ['updateCnt']],
          ['유지', ['maintainCnt']],
          // TODO: add timestamp
        ]}
        rows={updateHistories}
        emptyText="업데이트 이력 없음"
      />
    </>
  );
}
