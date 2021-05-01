import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import { uosRed, uosYellow, foregroundColor } from '@utils/styles/Colors';
import userIcon from '@img/fontawesome/chat-user.svg';
import { useSetRecoilState } from 'recoil';
import { userInfoDialogState } from '@states/UserInfoDialog';

export default function ChatMessage({isMine, isSeq, from, message, readCnt}) {
    const setUserInfoDialog = useSetRecoilState(userInfoDialogState);

    const classes = useStyles();

    const time = dayjs(message.date).format('HH:mm');
    const messageStyle = isMine ? classes.mine : classes.other;
    const iconStyle = classes.icon + ' ' + (isSeq ? classes.hidden : ''); 

    const onIconClick = () => {
        setUserInfoDialog({
            userId: message.from,
            open: true
        });
    }

    return (
        <li className={classes.root}>
            { isMine ? null : <img className={iconStyle} onClick={onIconClick} src={userIcon} />}
            <Container className={classes.container}>
                { isMine || isSeq ? null : <Typography className={classes.from}>{from}</Typography> }
                <Container className={messageStyle}>
                    <Typography className={classes.content}>{message.content}</Typography>
                    <Typography className={classes.time}>{time}</Typography>
                    <Typography className={classes.readCnt}>{readCnt > 0 ? readCnt : null }</Typography>
                </Container>
            </Container>
        </li>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '3px 0px 0px 0px',
        padding: '0px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px',
        margin: '0px 3px 0px 3px'
    },
    mine: {
        width: '100%',
        display: 'flex',
        padding: '0px',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        '& $content': {
            backgroundColor: uosYellow
        },
        '& $from': {
            display: 'none'
        }
    },
    other: {
        width: '100%',
        display: 'flex',
        padding: '0px',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        '& $content': {
            backgroundColor: uosRed
        }
    },
    readCnt: {
        fontSize: '0.7rem',
        color: uosYellow,
        margin: '0px 1px 0px 1px'
    },
    time: {
        fontSize: '0.7rem',
        margin: '0px 1px 0px 1px'
    },
    content: {
        maxWidth: '90%',
        fontSize: '0.9rem',
        margin: '0px 1px 0px 1px',
        padding: '0px 6px 0px 6px',
        borderRadius: '5px'
    },
    from: {
        fontSize: '0.5rem'
    },
    icon: {
        width: '1.6rem',
        height: '1.6rem',
        color: foregroundColor,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    hidden: {
        visibility: 'hidden'
    }
})