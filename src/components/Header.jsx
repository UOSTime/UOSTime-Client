import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme, AppBar, Tabs, Tab, Typography, Box, Link, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Badge } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationIcon from '@material-ui/icons/Announcement';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import Logo from './Logo';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
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
  grayButton: {
    color: '#C4C4C4',
    backgroundColor: '#f6f6f6',
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
  const [notiAnchorEl, setNotiAnchorEl] = React.useState(null);
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
    setChatChecked(!chatChecked);
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
  const handleNotiClick = (event) => {
    setNotiAnchorEl(event.currentTarget);
    setNotiChecked(!notiChecked);
  }
  const handleUserButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserDialogClose = () => {
    setAnchorEl(null);
  };
  const handleNotiDialogClose = () => {
    setNotiAnchorEl(null);
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
          <Tab label="강의교환" classes={{ root: classes.tab, selected: classes.selected }} {...a11yProps(1)} />
        </Tabs>
        <Box className={classes.buttonBox}>
          <IconButton aria-label="grayChat" onClick={handleChatClick}>
            <Badge badgeContent={3} color="secondary" invisible={chatChecked}>
              <ForumIcon className={classes.grayButton} />
            </Badge>
          </IconButton>
          <IconButton aria-label="noti" onClick={handleNotiClick}>
            <Badge badgeContent={2} color="secondary" invisible={notiChecked}>
              <NotificationIcon
                className={classes.grayButton} 
                aria-controls="notification-menu"
                aria-haspopup="true"/>
              </Badge>
            </IconButton>
          <Menu
            id="userInfo-menu"
            anchorEl={notiAnchorEl}
            keepMounted
            open={Boolean(notiAnchorEl)}
            onClose={handleNotiDialogClose}
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
              <ListItemText secondary="이것은 공지사항 내용입니다." />
            </MenuItem>
            <MenuItem>
              <ListItemIcon><AnnouncementOutlinedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="공지사항2" />
              <ListItemText secondary="이것은 공지사항2 내용입니다." />
            </MenuItem>
          </Menu>
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