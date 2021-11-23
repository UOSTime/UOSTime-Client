import React, { useEffect, useState } from "react";
import StatusCodes from "http-status-codes";
import {
  requestAPI,
  API_MAKE_AUTH_CODE,
  API_MATCH_AUTH_CODE,
} from "@utils/api";
import {
  Button,
  Box,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";
import UosInput from "@components/UosInput";

export default function EmailAuth() {
  const [userEmail, setUserEmail] = useState(null);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [code, setCode] = useState(null);

  const classes = useStyles();

  const codeOnChange = (e) => {
    setCode(e.target.value);
  };

  const emailOnChange = (e) => {
    setUserEmail(e.target.value);
  };

  const codeOnEnterPress = (e) => {
    if (e.key == "Enter") {
      handleAuth();
    }
  };

  const emailOnEnterPress = (e) => {
    if (e.key == "Enter") {
      handleSendCode();
    }
  };

  const handleSendCode = async () => {
    try {
      const res = await requestAPI(API_MAKE_AUTH_CODE({ email: userEmail }));
      if (res.status === StatusCodes.NO_CONTENT) setIsCodeSend(true);
    } catch (err) {
      alert(err.message);
      throw err;
    }
  };

  const handleAuth = async () => {
    try {
      const userId = window.localStorage.getItem("userID");
      const res = await requestAPI(API_MATCH_AUTH_CODE().setPath(userId, code));
      if (res.status === StatusCodes.NO_CONTENT) {
        alert("이메일이 성공적으로 인증되었습니다!");
      }
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  return (
    <Container className={classes.container}>
      <Typography className={classes.title}>이메일 인증</Typography>
      <Typography className={classes.subTitle}>
        서울시립대학교 포털 이메일 인증을 하신 후 강의 교환 서비스를 이용하실 수
        있습니다.
      </Typography>
      <Container className={classes.inputWrapper}>
        <UosInput
          className={classes.input}
          type="email"
          name="email"
          label="email"
          onChange={emailOnChange}
          onKeyPress={emailOnEnterPress}
          value={userEmail}
          placeholder="서울시립대학교 이메일을 입력해주세요."
        />
        <Button className={classes.button} onClick={handleSendCode}>
          인증 코드 전송
        </Button>
      </Container>
      {isCodeSend && (
        <Container className={classes.inputWrapper}>
          <UosInput
            className={classes.input}
            type="password"
            name="code"
            label="인증코드"
            onChange={codeOnChange}
            onKeyPress={codeOnEnterPress}
            value={code}
          />
          <Button className={classes.button} onClick={handleAuth}>
            인증
          </Button>
        </Container>
      )}
    </Container>
  );
}

const useStyles = makeStyles({
  container: {
    margin: "auto",
  },
  title: {
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  subTitle: {
    alignItems: "center",
    textAlign: "center",
    fontSize: "1rem",
    marginButtom: "1rem",
    color: "#A3A2A2",
  },
  inputWrapper: {
    display: "flex",
    width: "60%",
    flexDirection: "row",
    marginTop: "2rem",
  },
  input: {
    flex: 9,
  },
  button: {
    flex: 3,
    marginLeft: "1rem",
    backgroundColor: "#CFCFCF",
    textAlign: "center",
    boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "1.5rem",
    color: "#FFF",
  },
});
