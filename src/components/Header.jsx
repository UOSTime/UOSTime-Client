import React from 'react';
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import Logo from './Logo';

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
  logoBox: {
    display: 'flex',
    flexDirection: 'row',
    color: '#4e4e4e',
    flexGrow: 0.08,
    alignItems: 'center',
    padding: '6px 12px',
  },
  font: {
    fontSize: '32px',
    marginLeft: '12px',
  },
  tab: {
    height: '60px',
    fontSize: '20px',
    color: '#c4c4c4',
    '&$selected':{
      color: '#f68b7d',
    },
  },
  selected: {},
  indicator: {
    height: '4px',
  },
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
        <Box className={classes.logoBox}>
          <Logo size='smd'/>
          <Typography className={classes.font}>UOSTime</Typography>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
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