import StatusCodes from 'http-status-codes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { semesterState } from '../states/Semester';
import { userIDState } from '../states/User';
import { Link, Redirect } from 'react-router-dom';
import { API_LOGIN, requestAPI } from '../utils/api';
import Loading from '../components/Loading';
import FindIdDialog from '../components/login/findId';
import FindPWDialog from '../components/login/findPw';
import { Box, Container, makeStyles, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default function Login() {
  const [userID, setUserID] = useRecoilState(userIDState);
  const setSemester = useSetRecoilState(semesterState);
  const [loginInfo, setLoginInfo] = useState({uid: '', pw: ''});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState(null);
  const [findOpen, setFindOpen] = useState({id: false, pw: false});

  const loginBtn = useRef();

  const login = () => {
    if(!(loginInfo.uid.length && loginInfo.pw.length)) {
      setWarning('아이디와 비밀번호를 입력해주세요!');

      return;
    }

    const callLogin = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await requestAPI(API_LOGIN, loginInfo);

        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('userID', data.userId);
        setUserID(data.userId);
      } catch(e) {
        const statusCode = parseInt(e.message);

        switch(statusCode) {
          case StatusCodes.UNAUTHORIZED:
            setWarning('아이디 혹은 비밀번호가 틀렸어요!');
            setLoginInfo({
              ...loginInfo,
              pw: ''
            });
            break;
          
          case StatusCodes.BAD_REQUEST:
            setWarning('클라이언트에서 오류가 났어요. 계속 시도해도 안되면 UOSTime 팀에 문의해주세요!');
            break;
          
          default:
            setWarning('서버에서 오류가 났어요. 계속 시도해도 안되면 UOSTime 팀에 문의해주세요!');
            break;
        }
      }

      setLoading(false);
    }
    callLogin();
  };

  const dialogOnClose = () => {
    setFindOpen({id: false, pw: false});
  };

  const openFindDialog = (e) => {
    const name = e.target.name === 'findID' ? 'id' : 'pw';
    setFindOpen({
      ...findOpen,
      [name]: true
    });
  };

  const inputOnChange = (e) => {
    const {value, name} = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  };

  const onEnterPress = (e) => {
    if(e.key == 'Enter') {
      login();
    }
  };

  if (userID) return <Redirect path='/' />;
  if (error) return <div>에러가 발생했어요...</div>
  return (
      <Grid container spacing={2} direction='column' justify='center' alignItems='center'>
        <Box p={5} xs={12}>
          <Grid container direction='column' justify='center' alignItems='stretch'>
            <TextField type='text' name='uid' label='아이디' onChange={inputOnChange} value={loginInfo.uid} />
            <TextField type='password' name='pw' label='비밀번호' onChange={inputOnChange} onKeyPress={onEnterPress} value={loginInfo.pw} />
            <Button className="" onClick={login} ref={loginBtn} color='primary'>Login</Button>
          </Grid>
          { warning.length > 0 ? <span>{warning}</span> : null }
          <div>
            <span>UOSTime이 처음이신가요?</span>
            <Link>회원가입</Link>
          </div>
          <div>
            <span>아이디가 기억나지 않으신가요?</span>
            <Link name='findID' onClick={openFindDialog}>아이디 찾기</Link>
          </div>
          <div>
            <span>비밀번호가 기억나지 않으신가요?</span>
            <Link name='findPW' onClick={openFindDialog}>비밀번호 찾기</Link>
          </div>
          {loading ? <Loading /> : null}
          <FindIdDialog onClose={dialogOnClose} open={findOpen.id}/>
          <FindPWDialog onClose={dialogOnClose} open={findOpen.pw}/>
        </Box>
      </Grid>
  );
}
