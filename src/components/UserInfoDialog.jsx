import React, { useEffect, useState } from 'react';
import CustomDialog from '@components/CustomDialog';
import { useRecoilState } from 'recoil';
import { userInfoDialogState } from '../states/UserInfoDialog';
import { Button, Container, Typography } from '@material-ui/core';
import userIcon from '@img/fontawesome/chat-user.svg';

export default function UserInfoDialog() {
    const [dialogState, setDialogState] = useRecoilState(userInfoDialogState);
    const [userInfo, setUserInfo] = useState({name: '', createdAt: '', tradeCnt: 0, fraudCnt: 0});

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
            <Button key='report' onClick={onReport}>신고하기</Button>,
            <Button key='close' onClick={onClose}>닫기</Button>
        ]
      };
    
    useEffect(() => {
        // TODO - 유저 조회 api 호출
    }, []);

    return (
        <CustomDialog {...props} >
            <img src={userIcon}/>
            <Typography>{userInfo.name}</Typography>
            <Container>
                <Typography>가입 일자: {userInfo.createdAt}</Typography>
                <Typography>강의 교환 횟수: {userInfo.tradeCnt}건</Typography>
                <Typography>사기 신고: {userInfo.fraudCnt}건</Typography>
            </Container>
        </CustomDialog>
    )
}