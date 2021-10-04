import React, { useEffect, useState } from "react";
import StatusCodes from "http-status-codes";
import {
  requestAPI,
  API_MAKE_AUTH_CODE,
  API_MATCH_AUTH_CODE,
  API_MY_INFO,
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
    console.log(userEmail);
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
      const res = await requestAPI(API_MATCH_AUTH_CODE().setPath(code));
      if (res.status === StatusCodes.NO_CONTENT) {
        alert("이메일이 성공적으로 인증되었습니다!");
      }
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  return (
    <Container>
      <Container>
        <Typography>이메일 인증</Typography>
        <Container>
          <UosInput
            type="email"
            name="email"
            label="email"
            onChange={emailOnChange}
            onKeyPress={emailOnEnterPress}
            value={userEmail}
          />
          <Button onClick={handleSendCode}>인증 코드 전송</Button>
        </Container>
      </Container>

      {isCodeSend && (
        <Container>
          <UosInput
            type="password"
            name="code"
            label="인증코드"
            onChange={codeOnChange}
            onKeyPress={codeOnEnterPress}
            value={code}
          />
          <Button onClick={handleAuth}>인증</Button>
        </Container>
      )}
    </Container>
  );
}
