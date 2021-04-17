import React, { useEffect, useState } from 'react';
import { requestAPI, API_SEND_CODE, API_AUTH_EMAIL, API_MY_INFO } from '@utils/api';
import { Button, Box, makeStyles, Container, Typography } from '@material-ui/core';
import UosInput from '@components/UosInput';


export default function EmailAuth() {
    const userID = window.localStorage.getItem('userID');
    const [userEmail,setUserEmail] = useState(null);
    const [isCodeSend, setIsCodeSend] = useState(false);
    const [code, setCode] = useState(null);

    useEffect(async()=> {
        try{
            const res = await requestAPI(API_MY_INFO, userID);
            setUserEmail(res.data.email);
        }
        catch(err){
            alert(err);
            throw err;
        }
    },[])

    const inputOnChange = (e) => {
        setCode(e.target.value);
    };
    
    const onEnterPress = (e) => {
        if(e.key == 'Enter') {
          handleAuth();
        }
    };

    const handleSendCode = async () => {
        console.log(userEmail);
        try{
            await requestAPI(API_SEND_CODE(), {email: userEmail});
        }
        catch(err){
            alert(err.message);
            throw err;
        }
    }

    const handleAuth = async () => {
        console.log(userID, code);
        try{
            const res = await requestAPI(API_AUTH_EMAIL(userID, code));
            if(res.status === 204){
                alert('이메일이 성공적으로 인증되었습니다!');
            }
        }
        catch(err){
            alert(err)
            throw err;
        }
    }

    return( //TODO: 컴포넌트로 나누기
        <Container>  
            <Container>
                <Typography>이메일 인증</Typography>
                <Container>
                    <Typography>{userEmail}</Typography> 
                    <Button onClick={handleSendCode}>
                        인증 코드 전송
                    </Button>
                </Container>
            </Container>
            
            {isCodeSend &&
            <Container>
            <UosInput
                type='password' 
                name='code' 
                label='인증코드' 
                onChange={inputOnChange} 
                onKeyPress={onEnterPress}
                value={code}
            />
            <Button onClick={handleAuth}>인증</Button>
            </Container>}
        </Container>
    )
}