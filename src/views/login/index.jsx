import StatusCodes from 'http-status-codes';
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button, Box, makeStyles, Container, Typography, Link } from '@material-ui/core';
import { semesterState } from '@states/Semester';
import { userIDState } from '@states/User';
import Loading from '@components/Loading';
import UosInput from '@components/UosInput';
import FindIdDialog from '@components/login/findId';
import FindPWDialog from '@components/login/findPw';
import { API_LOGIN, requestAPI } from '@utils/api';
import { foregroundColor, uosRed, uosYellow, uosBlue } from '@utils/styles/Colors';
import useLogoLayoutStyles from '@utils/styles/login/LogoLayout';
import useLoginLabelStyles from '@utils/styles/login/LoginLabel';
import theme from '@utils/styles/Theme';
import Logo from '@views/login/Logo';
import useLinkStyles from '../../utils/styles/Link';



export default function Login() {
  const [userID, setUserID] = useRecoilState(userIDState);
  const setSemester = useSetRecoilState(semesterState);
  const [loginInfo, setLoginInfo] = useState({uid: '', pw: ''});
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState(null);
  const [findOpen, setFindOpen] = useState({id: false, pw: false});

  const classes = useStyles();
  const logoLayoutClass = useLogoLayoutStyles();
  const loginLabelClass = useLoginLabelStyles();
  const linkClass = useLinkStyles();

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
    console.log(e.target)
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
  if (error) return <Box>에러가 발생했어요...</Box>
  return (
      <Container className={classes.container}>
      <Box className={logoLayoutClass.root} >
        <Logo />
        <Typography className={loginLabelClass.root}>UOSTime</Typography>
      </Box>
      <Container className={classes.loginPanel}>
        <Container className={classes.loginInputPanel}>
          <UosInput type='text' name='uid' label='아이디' onChange={inputOnChange} value={loginInfo.uid} />
          <UosInput type='password' name='pw' label='비밀번호' onChange={inputOnChange} onKeyPress={onEnterPress} value={loginInfo.pw} />
          { warning.length > 0 ? <Typography className={classes.warning}>{warning}</Typography> : null }
        </Container>
        <Button className={classes.loginBtn} onClick={login} ref={loginBtn}>Login</Button>
        <Container className={classes.otherLink}>
          <Box className={classes.rowBox}>
            <Typography>아이디를 잊으셨나요?</Typography>
            <Link name='findID' className={linkClass.blue} onClick={openFindDialog}>아이디 찾기</Link>
          </Box>
          <Box className={classes.rowBox}>
            <Typography>비밀번호를 잊으셨나요?</Typography>
            <Link name='findPW' className={linkClass.blue} onClick={openFindDialog}>비밀번호 찾기</Link>
          </Box>
          <Typography className={classes.seperator}>또는</Typography>
          <Box className={classes.rowBox}>
            <Typography>UOSTime이 처음이신가요?</Typography>
            <Link className={linkClass.red}>회원가입</Link>
          </Box>
        </Container>
        {loading ? <Loading /> : null}
        <FindIdDialog onClose={dialogOnClose} open={findOpen.id}/>
        <FindPWDialog onClose={dialogOnClose} open={findOpen.pw}/>
      </Container>
      </Container>
  );
}






const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  loginPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '310px',
    height: '400px',
    margin: '0px',
    marginRight: '40px',
    padding: '0px',
    paddingLeft: '50px',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      height: '350px',
    }
  },
  loginInputPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0px',
    height: '110px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      height: '80px',
    }
  },
  loginBtn: {
    background: `linear-gradient(145deg, ${uosRed} 30%, ${uosYellow} 90%)`,
    borderRadius: '100px',
    border: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    height: 48,
    width: '100%',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  otherLink: {
    height: '120px',
    weight: '100%',
    padding: '0px',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: foregroundColor
  },
  seperator: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: foregroundColor,
    '&:before, &:after': {
      content: '""',
      flex: 1,
      borderBottom: `0.09rem solid ${foregroundColor}`,
    },
    '&::before': {
      marginRight: '.5em'
    },
    '&::after': {
      marginLeft: '.5em'
    }
  },
  warning: {
    color: 'red',
    fontSize: '0.8rem'
  }
})