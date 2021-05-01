import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userInfoDialogState } from '@states/UserInfoDialog';
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import userIcon from '@img/fontawesome/chat-user.svg';

export default function RoomInfoMenu({anchorEl, chatRoom, open, onClose}) {
    const setUserInfoDialog = useSetRecoilState(userInfoDialogState);
    
    const classes = useStyles();

    const options = JSON.stringify(chatRoom)!=='{}' ? chatRoom.participants : [];
    
    const onItemClick = (e) => {
        const userId = e.currentTarget.getAttribute('name');

        setUserInfoDialog({
            userId: userId,
            open: true
        });
    }

    return (
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={open}
            onClose={onClose}
            PaperProps={{
            style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
            },
            }}
        >
            {
                options.map((option, idx) => (
                    <MenuItem name={option._id} key={idx} selected={option === 'Pyxis'} onClick={onItemClick}>
                        <img className={classes.icon} src={userIcon} />
                        <Typography className={classes.name}>{option.name}</Typography>
                    </MenuItem>
                    ))
            }
        </Menu>
    )
}

const useStyles = makeStyles({
    icon: {
        width: '30px',
        height: '30px',
        marginRight: '5px'
    },
    name: {
        textAlign: 'center'
    }
})