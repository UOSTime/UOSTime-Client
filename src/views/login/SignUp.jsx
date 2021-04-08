import React, { useState } from 'react';
import {Button, Container, DialogTitle, makeStyles, Typography} from '@material-ui/core';
import UosInput from '@components/UosInput';
import useButtonStyles from '@utils/styles/Button';
import useFontStyles from '@utils/styles/Font';
import UosDialog from '@components/UosDialog';
import { requestAPI, API_SIGN_UP } from '@utils/api';
import { uosRed } from '@utils/styles/Colors';
import Loading from '@components/Loading';

export default function SignUpDialog({onClose, open}) {
    const [ newUser, setNewUser ] = useState({uid: '', pw: '', pw2: '', name: '', email: '', code:''});
    const [ loading, setLoading ] = useState(false);
    const [ result, setResult ] = useState({send: false, error: ''});
    const [ isAuth, setIsAuth ] = useState(false);

    const classes = useStyles();
    const fontClasses = useFontStyles({fontSize: '0.8rem'});
    const buttonClasses = useButtonStyles({
        width: '100%',
        height: '40px', 
        fontSize: '16px',
        padding: 0,
        borderRadius: '10px',
        alignSelf: 'flex-end',
        margin: '20px 0px',
      });

    const onCustomClose = () => {
        setNewUser({uid: '', pw: '', pw2: '', name: '', email: ''});
        setResult({send: false, error: ''});
        setLoading(false);
        onClose();
      }

    const onChange = (e) => {
        const {name, value} = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    }

    const handleEmailAuth = () => {//TODO
        setIsAuth(true);
        try{
            //await requestAPI()
            
        }
        catch{
            setIsAuth(false)
        }
    }

    const onSubmit = async () => {
        if(!(newUser.uid && newUser.pw && newUser.pw2 && newUser.name, newUser.email)) {
            setResult({
                send: false,
                error: '모든 입력란을 다 채워주세요!'
            });
            return;
        }
        if(newUser.pw !== newUser.pw2) {
            setResult({
                send: false,
                error: '비밀번호가 일치하지 않아요!'
            });
            return;
        }
        if(!checkUidFormat(newUser.uid)) {
            setResult({
                send: false,
                error: '아이디 형식이 맞지 않아요!'
            });
            return;
        }
        if(!checkPwFormat(newUser.pw)) {
            setResult({
                send: false,
                error: '비밀번호 형식이 맞지 않아요!'
            });
            return;
        }
        if(!checkNameFormat(newUser.name)) {
            setResult({
                send: false,
                error: '닉네임 형식이 맞지 않아요!'
            });
            return;
        }
        if(!newUser.code) {
            const ret = confirm('이메일 인증이 완료되지 않았습니다. 계속하시겠습니까?')
            if(!ret) return;
        }

        setLoading(true);
        try {
            await requestAPI(API_SIGN_UP);          // TODO
            // await axios.post('https://virtserver.swaggerhub.com/uostime/UOSTime/2.0.0/api/user', newUser);
            setResult({send: true, error: ''});
        } catch(e) {
            setResult({send: false, error: e.message});
        }
        setLoading(false);
    }

    const errorMessage = result.error ? <Typography className={fontClasses.warning}>{result.error}</Typography> : null;
    const resultMessage = result.send ? <Typography className={fontClasses.blue}>회원가입이 완료되었어요!</Typography> : null;
    const loadingMessage = loading ? <Loading /> : null;
    return (
        <UosDialog fullWidth onClose={onCustomClose} open={open}>
          <DialogTitle className={classes.title}>회원가입</DialogTitle>
          <Container className={classes.content}>
            <Container>
                <UosInput name='uid' type='text' label='아이디' onChange={onChange} value={newUser.uid} />
                <Typography className={fontClasses.default}>4 ~ 20자의 영문자, 숫자, 특수기호(_)만 사용해주세요.</Typography>
            </Container>
            <Container>
                <UosInput name='pw' type='password1' label='비밀번호' onChange={onChange} value={newUser.pw} />
                <Typography className={fontClasses.default}>4 ~ 20자의 영문자, 숫자, 특수문자(!@#$%^&*_())를 사용해주세요.</Typography>
            </Container>
            <Container>
                <UosInput name='pw2' type='password1' label='비밀번호 확인' onChange={onChange} value={newUser.pw2} />
                <Typography className={fontClasses.default}>비밀번호를 한 번 더 입력해주세요.</Typography>
            </Container>
            <Container>
                <UosInput name='name' type='text' label='닉네임' onChange={onChange} value={newUser.name} />
                <Typography className={fontClasses.default}>4 ~ 20자의 한글, 영문자, 숫자를 사용해주세요.</Typography>
            </Container>
            <Container>
                <Container className={classes.emailRow}>
                    <UosInput name='email' type='text' label='이메일' onChange={onChange} value={newUser.email} />
                    <Typography className={fontClasses.default}>@uos.ac.kr</Typography>
                </Container>
                <Typography className={fontClasses.default}>서울시립대학교 포탈 이메일을 입력해주세요.</Typography>
            </Container>
            {isAuth &&
                <Container>
                    <UosInput name='code' type='text' label='인증코드' onChange={onChange} value={newUser.code} />
                    <Typography className={fontClasses.default}>메일로 전송된 코드를 입력해주세요.</Typography>
                </Container>
            }
            
            { resultMessage }
            { errorMessage }
            {!isAuth && <Button className={buttonClasses.linearRed} onClick={handleEmailAuth}>메일 인증</Button>}
            <Button className={buttonClasses.linearRed} onClick={onSubmit}>회원가입</Button>
          </Container>
          { loadingMessage }
        </UosDialog>
    )
}


function checkUidFormat(uid) {
    const uidReg = new RegExp('[a-zA-Z0-9_]{4,20}');

    return uid && uid.match(uidReg) && uid.match(uidReg)[0].length === uid.length;
}

function checkPwFormat(pw) {
    const pwReg = new RegExp('[a-zA-Z0-9!@#$%^&*_()]{4,20}');

    return pw && pw.match(pwReg) && pw.match(pwReg)[0].length === pw.length;
}

function checkNameFormat(name) {
    return 4<= name.length && name.length <= 20;
}

const useStyles = makeStyles({
    title: {
        color: uosRed,
        marginLeft: '10px',
        marginTop: '10px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    emailRow: {
        height: '50px',
        padding: '0px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingBottom: '5px',
      },
});