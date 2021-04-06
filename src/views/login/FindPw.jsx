import React, { useState } from 'react';
import {Button, Container, DialogTitle, makeStyles, Typography} from '@material-ui/core';
import UosInput from '@components/UosInput';
import useButtonStyles from '@utils/styles/Button';
import useFontStyles from '@utils/styles/Font';
import UosDialog from '@components/UosDialog';
import { requestAPI, API_FIND_PW } from '@utils/api';

export default function FindPWDialog({onClose, open}) {
  const [ input, setInput ] = useState({email: '', username: ''});
  const [ send, setSend ] = useState(false);
  const [ emailError, setEmailError ] = useState('');
  const [ usernameError, setUsernameError ] = useState('');

  const classes = useStyles();
  const fontClass = useFontStyles();
  const buttonClass = useButtonStyles({
    width: '100%', 
    height: '40px', 
    fontSize: '16px',
    padding: 0,
    borderRadius: '10px',
    alignSelf: 'flex-end'
  });

  const onChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value
    });
  }

  const onClick = async () => {
    console.log(input.email, input.username);
    if(!input.email) {
      setUsernameError('');
      setEmailError('이메일을 입력해주세요!');
      setSend(false);
      return;
    } else if(!input.username) {
      setUsernameError('아이디를 입력해주세요!');
      setEmailError('');
      setSend(false);
      return;
    }

    try {
      await requestAPI(API_FIND_PW, {});     // ?email=...&uid=...
      setError('');
      setSend(true);
    } catch(e) {
      switch (e.message) {
        case '400':
          setEmailError('클라이언트에서 오류가 발생했어요...');
          break;

        case '404':
          setEmailError('해당 이메일로 등록된 계정이 없어요');
          break;

        default:
          setEmailError('서버에서 오류가 발생했어요...');
          break;
      }
      setUsernameError('');
      setSend(false);
    }
  }
  const emailErrorMessage = emailError ? <Typography className={fontClass.red}>{ emailError }</Typography> : null;
  const usernameErrorMessage = usernameError ? <Typography className={fontClass.red}>{ usernameError }</Typography> : null;
  const resultMessage = send ? <Typography className={fontClass.red}>이메일로 임시 비밀번호를 전송했어요!</Typography> : null;
  return (
    <UosDialog fullWidth maxWidth='xs' onClose={onClose} open={open}>
      <DialogTitle>비밀번호 찾기</DialogTitle>
      <Container className={classes.content}>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>아이디를 입력해주세요.</Typography>
          <UosInput name='username' className={classes.inputId} type='text' label='아이디' onChange={onChange} value={input.username} />
          { usernameErrorMessage }
        </Container>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>서울시립대학교 포탈 이메일을 입력해주세요.</Typography>
          <Container className={classes.emailRow}>
            <UosInput name='email' type='text' label='이메일' onChange={onChange} value={input.email} />
            <Typography className={fontClass.default}>@uos.ac.kr</Typography>
          </Container>
          { emailErrorMessage }
          { resultMessage }
        </Container>
        <Button className={buttonClass.blue} onClick={onClick}>찾기</Button>
      </Container>
    </UosDialog>
  );
}

const useStyles = makeStyles({
  content: {
    height: '300px',
    display: 'flex',
    paddingLeft: '40px',
    paddingRight: '40px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
  block: {
    height: '50px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '5px',
  },
  emailRow: {
    height: '50px',
    padding: '0px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingBottom: '5px',
  },
  inputId: {
    width: '200px'
  }
});