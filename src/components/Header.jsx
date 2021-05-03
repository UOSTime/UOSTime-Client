import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Link, Button, IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PersonIcon from '@material-ui/icons/Person';
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
    margin: '0 0 0 0',
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
    '&:hover': {
      color: '#f68b7d',
    },
  },
  selected: {},
  indicator: {
    height: '4px',
    backgroundColor: '#f68b7d',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: '4px'
  },
  inactivedButton: {
    color: '#C4C4C4',
    fontSize: '28px',
  },
  activedButton: {
    color: '#f68b7d',
    fontSize: '28px',
  },
  userButton: {
    color: '#A6C0FE',
    fontSize: '18px',
    padding: '12px 12px 12px 24px',
  },
  innerIcon: {
    transform: 'scale(1.4)',
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    /* 라우팅 처리
    switch (newValue) {
      case 0:
          history.push("/");
          break;
      case 1:
          history.push("/board");
          break;
      case 2:
          history.push("/notice");
          break;
      }  
      */
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Link href='/' underline='none'>
          <Box className={classes.logoBox}>
            <Logo size='smd'/>
            <Typography className={classes.font}>UOSTime</Typography>
          </Box>
        </Link>
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
        <Box className={classes.buttonBox}>
          <IconButton aria-label="chat"><ForumOutlinedIcon className={classes.inactivedButton} /></IconButton>
          {/*<IconButton aria-label="chat"><ForumIcon className={classes.activedButton} /></IconButton>*/}
          {/*<IconButton aria-label="notification"><NotificationsNoneOutlinedIcon className={classes.inactivedButton} /></IconButton>*/}
          <IconButton aria-label="notification"><NotificationsActiveIcon className={classes.activedButton} /></IconButton>
          <Button
            className={classes.userButton}
            startIcon={<PersonIcon className={classes.innerIcon} />}
          >
            ThisIsUser
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}