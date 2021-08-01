import React, { useState } from 'react';
import StatusCodes from 'http-status-codes';
import { Button, Container, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import Loading from '@components/Loading';
import UosDialog from '@components/UosDialog';
import UosInput from '@components/UosInput';
import { requestAPI, API_FIND_PW } from '@utils/api';
import useButtonStyles from '@utils/styles/Button';
import useFontStyles from '@utils/styles/Font';

export default function FindPWDialog({ onClose, open }) {
  const [input, setInput] = useState({ email: '', username: '' });
  const [result, setResult] = useState({ send: false, emailError: '', usernameError: '' });
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const fontClass = useFontStyles();
  const buttonClass = useButtonStyles({
    width: '100%',
    height: '40px',
    fontSize: '16px',
    padding: 0,
    borderRadius: '10px',
    alignSelf: 'flex-end',
  });

  const onCustomClose = () => {
    setResult({ send: false, emailError: '', usernameError: '' });
    setInput({ username: '', email: '' });
    onClose();
  };

  const onChange = e => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClick = async () => {
    if (!input.email) {
      setResult({
        send: false,
        emailError: '이메일을 입력해주세요!',
        usernameError: '',
      });
      return;
    }

    if (!input.username) {
      setResult({
        send: false,
        emailError: '',
        usernameError: '아이디를 입력해주세요!',
      });
      return;
    }

    if (result.send) {
      setResult({ send: true, emailError: '이미 이메일을 보냈어요!' });
      return;
    }

    setIsLoading(true);
    const response = await requestAPI(API_FIND_PW({ email: input.email, uid: input.username }));

    if (response.status === StatusCodes.OK) {
      setResult({ send: true, emailError: '', usernameError: '' });
    } else {
      let message = '';
      switch (response.status) {
        case 400:
          message = '클라이언트에서 오류가 발생했어요...';
          break;
        case 404:
          message = '해당 이메일로 등록된 계정이 없어요';
          break;
        default:
          message = '서버에서 오류가 발생했어요...';
          break;
      }
      setResult({ send: false, emailError: message, usernameError: '' });
    }
    setIsLoading(false);
  };

  const emailErrorMessage = result.emailError ? (
    <Typography className={fontClass.red}>{result.emailError}</Typography>
  ) : null;
  const usernameErrorMessage = result.usernameError ? (
    <Typography className={fontClass.red}>{result.usernameError}</Typography>
  ) : null;
  const resultMessage = result.send ? (
    <Typography className={fontClass.blue}>
      이메일로 임시 비밀번호를 전송했어요!
    </Typography>
  ) : null;
  const loading = isLoading ? <Loading bg={false} size="lg" /> : null;

  return (
    <UosDialog onClose={onCustomClose} open={open}>
      <DialogTitle>비밀번호 찾기</DialogTitle>
      <Container className={classes.content}>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>
            아이디를 입력해주세요.
          </Typography>
          <UosInput
            name="username"
            className={classes.inputId}
            type="text"
            label="아이디"
            onChange={onChange}
            value={input.username}
          />
          {usernameErrorMessage}
        </Container>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>
            서울시립대학교 포탈 이메일을 입력해주세요.
          </Typography>
          <Container className={classes.emailRow}>
            <UosInput
              name="email"
              type="text"
              label="이메일"
              onChange={onChange}
              value={input.email}
            />
            <Typography className={fontClass.default}>@uos.ac.kr</Typography>
          </Container>
          {resultMessage}
          {emailErrorMessage}
        </Container>
        <Button className={buttonClass.blue} onClick={onClick}>
          찾기
        </Button>
      </Container>
      {loading}
    </UosDialog>
  );
}

const useStyles = makeStyles({
  content: {
    height: '350px',
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
    width: '200px',
  },
});
