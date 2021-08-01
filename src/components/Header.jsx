import React from 'react';
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { makeStyles, AppBar, Tabs, Tab, Typography, Box, Link, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Badge } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Forum';
import NotificationIcon from '@material-ui/icons/Announcement';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import FaceIcon from '@material-ui/icons/Face';
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
    flexWrap: 'wrap',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#4e4e4e',
    alignItems: 'center',
    padding: '6px 12px',
    order: 0,
    [theme.breakpoints.down('sm')]: {
      flex: '50%'
    },
  },
  uostimeFont: {
    fontSize: '32px',
    marginLeft: '12px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  tabContainer: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 3,
      flex: '100%'
    },
  },
  tab: {
    height: '60px',
    fontSize: '20px',
    color: '#c4c4c4',
    [theme.breakpoints.down('sm')]: {
      height: '40px',
      fontSize: '18px'
    },
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    order: 2,
    [theme.breakpoints.down('sm')]: {
      flex: '50%',
      justifyContent: 'flex-end',
    },
  },
  iconButtons: {
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  grayIcons: {
    color: '#C4C4C4',
    backgroundColor: '#f6f6f6',
    fontSize: '28px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px'
    },
    '&:hover': {
      color: '#4e4e4e',
    },
  },
  badges: {
    fontWeight: 900,
  },
  userButton: {
    color: '#A6C0FE',
    fontSize: '18px',
    padding: '6px 12px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#4c81fc',
    },
  },
  innerIcon: {
    transform: 'scale(1.4)',
  },
}));

export default function Header() {
  const classes = useStyles();
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const isSmallScreen = useMediaQuery({ maxDeviceWidth: 320 })
  const [tabIndex, setTabIndex] = React.useState(0);
  const [chatChecked, setChatChecked] = React.useState(false);
  const [notiChecked, setNotiChecked] = React.useState(false);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
  const [chatAnchorEl, setChatAnchorEl] = React.useState(null);
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
  const handleMyInfoClick = () => {
    history.push("/user");
  }
  const handleSettingsClick = () => {
    history.push("/settings");
  }
  const handleLogOutClick = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userID');
    window.location.href = "/login";
  }
  const handleNotiClick = (event) => {
    setNotiAnchorEl(event.currentTarget);
    !notiChecked && setNotiChecked(true);
  }
  const handleChatClick = (event) => {
    setChatAnchorEl(event.currentTarget);
    !notiChecked && setChatChecked(true);
  }
  const handleUserButtonClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };
  const handleNotiMenuClose = () => {
    setNotiAnchorEl(null);
  };
  const handleChatMenuClose = () => {
    setChatAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Link href='/' underline='none'>
          <Box className={classes.logoContainer}>
            <Logo size={isDesktopOrLaptop ? 'smd' : 'sm'}/>
            <Typography className={classes.uostimeFont}>{!isSmallScreen && 'UOSTime'}</Typography>
          </Box>
        </Link>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          classes={{ indicator: classes.indicator }}
          className={classes.tabContainer}
          variant="fullWidth"
          aria-label="full-width-tabs"
        >
          <Tab label="시간표" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(0)} />
          <Tab label="강의교환" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(1)} />
        </Tabs>
        <Box className={classes.buttonContainer}>
          <IconButton aria-label="chat" className={classes.iconButtons} onClick={handleChatClick}>
            <Badge badgeContent={3} color="secondary" classes={{badge: classes.badges}} invisible={chatChecked}>
              <ChatIcon className={classes.grayIcons} aria-controls="chat-menu" aria-haspopup="true" />
            </Badge>
          </IconButton>
          <IconButton aria-label="noti" className={classes.iconButtons} onClick={handleNotiClick}>
            <Badge badgeContent={2} color="secondary" classes={{badge: classes.badges}} invisible={notiChecked}>
              <NotificationIcon
                className={classes.grayIcons} 
                aria-controls="notice-menu"
                aria-haspopup="true"/>
            </Badge>
          </IconButton>
          <Button
            aria-controls="userInfo-menu"
            aria-haspopup="true"
            className={classes.userButton}
            startIcon={<PersonIcon className={classes.innerIcon} />}
            onClick={handleUserButtonClick}
          >
            {isDesktopOrLaptop && 'ThisIsUser'}
          </Button>
          {/* <========== 메뉴 모음 ==========> */}
           {/* <===== 채팅 메뉴 =====> */}
          <Menu
            id="chat-menu"
            anchorEl={chatAnchorEl}
            keepMounted
            open={Boolean(chatAnchorEl)}
            onClose={handleChatMenuClose}
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
            <MenuItem>
              <ListItemIcon><FaceIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="유저1" />
              <ListItemText secondary="이것은 유저1의 메시지입니다." inset="true" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon><FaceIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="유저2" />
              <ListItemText secondary="이것은 유저2의 메시지입니다." inset="true" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon><FaceIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="유저3" />
              <ListItemText secondary="이것은 유저3의 메시지입니다." inset="true" />
            </MenuItem>
          </Menu>
          {/* <===== 공지사항 메뉴 =====> */}
          <Menu
            id="notice-menu"
            anchorEl={notiAnchorEl}
            keepMounted
            open={Boolean(notiAnchorEl)}
            onClose={handleNotiMenuClose}
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
            <MenuItem>
              <ListItemIcon><AnnouncementOutlinedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="공지사항" />
            </MenuItem>
            <MenuItem>
              <ListItemText secondary="이것은 공지사항 내용입니다." inset="true" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon><AnnouncementOutlinedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="공지사항2" />
            </MenuItem>
            <MenuItem>
              <ListItemText secondary="이것은 공지사항2 내용입니다." inset="true" />
            </MenuItem>
          </Menu>
          {/* <===== 유저 정보 메뉴 =====> */}
          <Menu
            id="userInfo-menu"
            anchorEl={userAnchorEl}
            keepMounted
            open={Boolean(userAnchorEl)}
            onClose={handleUserMenuClose}
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
              <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="내 계정" />
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="설정" />
            </MenuItem>
            <MenuItem onClick={handleLogOutClick}>
              <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="로그아웃" />
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
    </Box>
  );
}