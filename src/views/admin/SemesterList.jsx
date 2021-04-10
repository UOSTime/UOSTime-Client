import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { API_UPDATE_LECTURES, API_GET_HISTORIES, requestAPI } from '@utils/api';
import { getUniqueID } from '@utils/id';
import { getAllTerms } from '@utils/semester';
import { getToday } from '@utils/time';

function UpdateHistoryListItem(props) {
  // props
  const {
    history: {
      // lastUpdatedAt = null, // TODO: where is the time?
      by,
      createCnt,
      updateCnt,
      deleteCnt,
      maintainCnt,
    },
  } = props;

  return (
    <ListItem>
      <ListItemText
        primary={`by ${by}. +${createCnt}/-${deleteCnt}/*${updateCnt}/=${maintainCnt}`}
      />
    </ListItem>
  );
}

export default function SemesterList() {
  const today = getToday();
  const allTerms = getAllTerms();

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
    const { data: histories } = await requestAPI(API_GET_HISTORIES(), {
      year: selectedYear,
      term: selectedTerm,
      page: 1, // TODO: make it selectable
    });
    setUpdateHistories(histories);
  }, [selectedYear, selectedTerm]);

  const updateLectures = () => {
    requestAPI(API_UPDATE_LECTURES(), {
      year: selectedYear,
      term: selectedTerm,
      // isTest
    });
  };

  const updateHistoryList = updateHistories.map(history => (
    <UpdateHistoryListItem
      key={history._id}
      history={history}
    />
  ));

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" p={2}>
        <Box mr="auto">
          <h1>Semesters</h1>
        </Box>
        <Box mx={1}>
          <TextField
            label="Year"
            type="number"
            defaultValue={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          />
        </Box>
        <Box mx={1}>
          <FormControl>
            <InputLabel id={termSelectLabelId}>Term</InputLabel>
            <Select
              labelId={termSelectLabelId}
              value={selectedTerm}
              onChange={e => setSelectedTerm(e.target.value)}
            >
              {
                allTerms.map(({ termCode, termName }) => (
                  <MenuItem value={termCode}>{termName}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        <Box mx={1}>
          <Button variant="contained" color="primary" onClick={() => updateLectures()}>Update</Button>
        </Box>
      </Box>
      <Paper>
        <List dense>
          {updateHistoryList}
        </List>
      </Paper>
    </>
  );
}
