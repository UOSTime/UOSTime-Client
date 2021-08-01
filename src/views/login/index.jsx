import StatusCodes from 'http-status-codes';
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button, Box, makeStyles, Container, Typography, Link } from '@material-ui/core';
import Loading from '@components/Loading';
import UosInput from '@components/UosInput';
import { userIDState } from '@states/User';
import { semesterState } from '@states/Semester';
import { API_LOGIN, API_GET_SEMESTER, requestAPI, removeToken, setToken } from '@utils/api';
import { foregroundColor } from '@utils/styles/Colors';
import useLogoLayoutStyles from '@utils/styles/login/LogoLayout';
import useLoginLabelStyles from '@utils/styles/login/LoginLabel';
import useButtonStyles from '@utils/styles/Button';
import useLinkStyles from '@utils/styles/Link';
import theme from '@utils/styles/Theme';
import { getSocket } from '@utils/socket';
import FindIdDialog from '@views/login/FindId';
import FindPWDialog from '@views/login/FindPw';
import Logo from '@views/login/Logo';
import SignUpDialog from './SignUp';

export default function Login() {
  const [userID, setUserID] = useRecoilState(userIDState);
  const setSemester = useSetRecoilState(semesterState);
  const [loginInfo, setLoginInfo] = useState({ uid: '', pw: '' });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');
  const [error, setError] = useState(null);
  const [findOpen, setFindOpen] = useState({
    id: false,
    pw: false,
    signUp: false,
  });

  const classes = useStyles();
  const logoLayoutClass = useLogoLayoutStyles();
  const loginLabelClass = useLoginLabelStyles();
  const linkClass = useLinkStyles();
  const buttonClass = useButtonStyles();

  const loginBtn = useRef();

  const callSemester = async () => {
    const response = await requestAPI(API_GET_SEMESTER());

    if (response.status !== StatusCodes.OK) {
      alert(response.data.message);
    }
    const semester = response.data;
    setSemester('semester', semester);
  };

  const login = () => {
    if (!(loginInfo.uid.length && loginInfo.pw.length)) {
      setWarning('아이디와 비밀번호를 입력해주세요!');
      return;
    }

    const callLogin = async () => {
      setLoading(true);
      setError(null);

      removeToken();

      const response = await requestAPI(API_LOGIN(loginInfo));

      if (response.status !== StatusCodes.OK) {
        switch (response.status) {
          case StatusCodes.UNAUTHORIZED:
            setWarning('아이디 혹은 비밀번호가 틀렸어요!');
            setLoginInfo({
              ...loginInfo,
              pw: '',
            });
            break;

          case StatusCodes.BAD_REQUEST:
            setWarning('클라이언트에서 오류가 났어요. 계속 시도해도 안되면 UOSTime 팀에게 문의해주세요!');
            break;

          default:
            setWarning('서버에서 오류가 났어요. 계속 시도해도 안되면 UOSTime 팀에게 문의해주세요!');
            break;
        }
        setLoading(false);
        return;
      }

      setToken(response.data.token);
      window.localStorage.setItem('userID', response.data.userId);
      setUserID(response.data.userId);

      await callSemester();
      getSocket();

      setLoading(false);
    };
    callLogin();
  };

  const dialogOnClose = () => {
    setFindOpen({ id: false, pw: false, signUp: false });
  };

  const openDialog = e => {
    let name;
    switch (e.target.name) {
      case 'findID':
        name = 'id';
        break;
      case 'findPW':
        name = 'pw';
        break;
      default:
        name = 'signUp';
        break;
    }

    setFindOpen({
      ...findOpen,
      [name]: true,
    });
  };

  const inputOnChange = e => {
    const { value, name } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const onEnterPress = e => {
    if (e.key === 'Enter') {
      login();
    }
  };

  if (userID) {
    getSocket();
    return <Redirect path="/" />;
  }
  if (error) return <Box>에러가 발생했어요...</Box>;
  return (
    <Container className={classes.container}>
      <Box className={logoLayoutClass.root}>
        <Logo />
        <Typography className={loginLabelClass.root}>UOSTime</Typography>
      </Box>
      <Container className={classes.loginPanel}>
        <Container className={classes.loginInputPanel}>
          <UosInput
            type="text"
            name="uid"
            label="아이디"
            onChange={inputOnChange}
            value={loginInfo.uid}
          />
          <UosInput
            type="password"
            name="pw"
            label="비밀번호"
            onChange={inputOnChange}
            onKeyPress={onEnterPress}
            value={loginInfo.pw}
          />
          {warning.length > 0 ? (
            <Typography className={classes.warning}>{warning}</Typography>
          ) : null}
        </Container>
        <Button
          className={buttonClass.linearRed}
          onClick={login}
          ref={loginBtn}
        >
          Login
        </Button>
        <Container className={classes.otherLink}>
          <Box className={classes.rowBox}>
            <Typography>아이디를 잊으셨나요?</Typography>
            <Link name="findID" className={linkClass.blue} onClick={openDialog}>
              아이디 찾기
            </Link>
          </Box>
          <Box className={classes.rowBox}>
            <Typography>비밀번호를 잊으셨나요?</Typography>
            <Link name="findPW" className={linkClass.blue} onClick={openDialog}>
              비밀번호 찾기
            </Link>
          </Box>
          <Typography className={classes.seperator}>또는</Typography>
          <Box className={classes.rowBox}>
            <Typography>UOSTime이 처음이신가요?</Typography>
            <Link name="signUp" className={linkClass.red} onClick={openDialog}>
              회원가입
            </Link>
          </Box>
        </Container>
        <FindIdDialog onClose={dialogOnClose} open={findOpen.id} />
        <FindPWDialog onClose={dialogOnClose} open={findOpen.pw} />
        <SignUpDialog onClose={dialogOnClose} open={findOpen.signUp} />
      </Container>
      {loading ? <Loading bg={false} size="lg" /> : null}
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    height: '96vh',
    width: '100%',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
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
    },
  },
  loginInputPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: '110px',
    },
  },
  otherLink: {
    height: '120px',
    weight: '100%',
    padding: '0px',
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: foregroundColor,
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
      marginRight: '.5em',
    },
    '&::after': {
      marginLeft: '.5em',
    },
  },
  warning: {
    color: 'red',
    fontSize: '0.8rem',
  },
});
