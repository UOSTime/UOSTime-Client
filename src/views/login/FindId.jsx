import React, { useState } from 'react';
import StatusCodes from 'http-status-codes';
import {Button, Container, DialogTitle, makeStyles, Typography} from '@material-ui/core';
import UosInput from '@components/UosInput';
import useButtonStyles from '@utils/styles/Button';
import useFontStyles from '@utils/styles/Font';
import UosDialog from '@components/UosDialog';
import Loading from '@components/Loading';
import { requestAPI, API_FIND_ID } from '@utils/api';

export default function FindIdDialog({onClose, open}) {
  const [ email, setEmail ] = useState('');
  const [ result, setResult ] = useState({send: false, error: ''});
  const [ send, setSend ] = useState(false);
  const [ error, setError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false); 

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

  const onCustomClose = () => {
    setResult({send: false, error: ''});
    setEmail('');
    onClose();
  }

  const onChange = (e) => {
    setEmail(e.target.value);
  }

  const onClick = async () => {
    if(!email) {
      setResult({send: false, error: '이메일을 입력해주세요!'});
      return;
    }
    if(result.send) {
      setResult({send: true, error: '이미 이메일을 보냈어요!'});
      return;
    }

    setIsLoading(true);
    const response = await requestAPI(API_FIND_ID().setQuery({email: email}));

    if(response.status === StatusCodes.OK) {
      setResult({send: true, error: ''});
    } else {
      let message = '';
      switch (response.status) {
        case 400:
          message = '클라이언트에서 오류가 발생했어요...';
          break;
        case 404:
          message = '해당 이메일로 등록된 계정이 없어요!';
          break;
        default:
          message = '서버에서 오류가 발생했어요...';
          break;
      }
      setResult({send: false, error: message});
    }
    setIsLoading(false);
  }
  
  const resultMessage = result.send ? <Typography className={fontClass.blue}>이메일로 아이디를 전송했어요!</Typography> : null;
  const errorMessage = result.error ? <Typography className={fontClass.red}>{result.error}</Typography> : null;
  const loading = isLoading ? <Loading bg={false} size='lg' /> : null;

  return (
    <UosDialog onClose={onCustomClose} open={open}>
      <DialogTitle>아이디 찾기</DialogTitle>
        <Container className={classes.content}>
        <Container>
          <Typography className={fontClass.default}>서울시립대학교 포탈 이메일을 입력해주세요.</Typography>
          <Container className={classes.emailRow}>
            <UosInput name='email' type='text' label='이메일' onChange={onChange} value={email} />
            <Typography className={fontClass.default}>@uos.ac.kr</Typography>
          </Container>
        { resultMessage }
        { errorMessage }
        </Container>
        <Button className={buttonClass.blue} onClick={onClick}>찾기</Button>
      </Container>
      { loading }
    </UosDialog>
  );
}

const useStyles = makeStyles({
  content: {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
    paddingRight: '20px',
  },
  emailRow: {
    height: '50px',
    padding: '0px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingBottom: '5px',
  }
});