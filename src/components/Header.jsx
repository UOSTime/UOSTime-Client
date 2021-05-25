import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Link, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
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
  const [tabIndex, setTabIndex] = React.useState(0);
  const [chatChecked, setChatChecked] = React.useState(false);
  const [notiChecked, setNotiChecked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
    /*
    switch (newTabIndex) {
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
  const handleChatClick = () => {
    setChatChecked(true);
    history.push("/chatRoom");
  };
  const handleGrayChatClick = () => {
    history.push("/chatRoom");
  }
  const handleMyInfoClick = () => {
    history.push("/user");
  }
  const handleSettingsClick = () => {
    history.push("/settings");
  }
  const handleLogOutClick = () => {
    history.push("/login");
  }
  const handleNotiClick = () => {
    setNotiChecked(true);
  };
  const handleUserButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserDialogClose = () => {
    setAnchorEl(null);
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
          value={tabIndex}
          onChange={handleTabChange}
          classes={{ indicator: classes.indicator }}
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="시간표" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(0)} />
          <Tab label="게시판" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(1)} />
          <Tab label="공지사항" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(2)} />
        </Tabs>
        <Box className={classes.buttonBox}>
          {chatChecked && <IconButton aria-label="grayChat" onClick={handleGrayChatClick}><ForumOutlinedIcon className={classes.inactivedButton} /></IconButton>}
          {!chatChecked && <IconButton aria-label="chat" onClick={handleChatClick}><ForumIcon className={classes.activedButton} /></IconButton>}
          {notiChecked && <IconButton aria-label="noti"><NotificationsNoneOutlinedIcon className={classes.inactivedButton} /></IconButton>}
          {!notiChecked && <IconButton aria-label="grayNoti" onClick={handleNotiClick}><NotificationsActiveIcon className={classes.activedButton} /></IconButton>}
          <Button
            aria-controls="userInfo-menu"
            aria-haspopup="true"
            className={classes.userButton}
            startIcon={<PersonIcon className={classes.innerIcon} />}
            onClick={handleUserButtonClick}
          >
            ThisIsUser
          </Button>
          <Menu
            id="userInfo-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleUserDialogClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleMyInfoClick}>
              <ListItemIcon><InfoIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="My Info" />
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Settings" />
            </MenuItem>
            <MenuItem onClick={handleLogOutClick}>
              <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
    </Box>
  );
}