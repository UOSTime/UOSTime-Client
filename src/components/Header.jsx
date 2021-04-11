import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import FillLogo from './FillLogo';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    backgroundColor: '#f6f6f6',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    color: '#4e4e4e',
    flexGrow: 0.1,
    fontSize: '32px',
  },
  tab: {
    color: '#c4c4c4',
    transition: 'none',
    '&$selected':{
      color: '#f68b7d',
    },
  },
  selected: {},
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <FillLogo size="small"/>
        <Typography className={classes.title}>UOSTime</Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="시간표" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(0)} />
          <Tab label="게시판" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(1)} />
          <Tab label="공지사항" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </Container>
  );
}