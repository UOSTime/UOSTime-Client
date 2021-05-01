import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import CustomDialog from '@components/CustomDialog';
import { userInfoDialogState } from '@states/UserInfoDialog';
import { convertUTCtoYYYYMMDD } from '@utils/time';
import userIcon from '@img/fontawesome/chat-user.svg';

export default function UserInfoDialog() {
    const [dialogState, setDialogState] = useRecoilState(userInfoDialogState);
    const [userInfo, setUserInfo] = useState({name: '유저 없음', createdAt: '2000-01-01T00:00:00.000Z', tradeCnt: 0, fraudCnt: 0});

    const classes = useStyles();

    const onClose = () => {
        setDialogState({
            ...dialogState,
            open: false
        })
    };

    const onReport = () => {
        console.log('신고');
    }

    const props = {
        userId: dialogState.userId,
        open: dialogState.open,
        isForm: false,
        title: '유저 정보',
        buttons: [
            <Button key='report' className={classes.reportBtn} onClick={onReport}>신고하기</Button>,
            <Button key='close' onClick={onClose}>닫기</Button>
        ]
      };
    
    useEffect(() => {
        // TODO - 유저 조회 api 호출
    }, []);

    return (
        <CustomDialog {...props} >
            <Container className={classes.root}>
                <img className={classes.icon} src={userIcon}/>
                <Typography className={classes.name} variant='h3'>{userInfo.name}</Typography>
                <Container className={classes.contents}>
                    <Typography className={classes.row}>가입 일자: {convertUTCtoYYYYMMDD(userInfo.createdAt)}</Typography>
                    <Typography className={classes.row}>강의 교환 건수: {userInfo.tradeCnt}건</Typography>
                    <Typography className={classes.fraud}>사기 이력: {userInfo.fraudCnt}건</Typography>
                </Container>
            </Container>
        </CustomDialog>
    )
}

const useStyles = makeStyles({
    root: {
        width: '200px',
        height: '300px',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    icon: {
        width: '90px',
        height: '90px',
        alignSelf: 'center'
    },
    name: {
        margin: '5px 0px 20px',
        fontSize: '1.5rem',
        alignSelf: 'center'
    },
    contents: {
        padding: '0'
    },
    row: {
        margin: '10px 0'
    },
    fraud: {
        color: 'red',
        margin: '10px 0'
    },
    reportBtn: {
        color: 'red'
    }
});