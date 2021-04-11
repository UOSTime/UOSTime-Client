import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
  },
  tab: {
    color: '#c4c4c4',
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
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          시간표
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          게시판
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          공지사항
        </TabPanel>
      </SwipeableViews>
    </Container>
  );
}