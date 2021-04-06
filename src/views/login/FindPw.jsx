import React from 'react';
import {Button, Container, DialogTitle, makeStyles, Typography} from '@material-ui/core';
import UosInput from '@components/UosInput';
import useButtonStyles from '@utils/styles/Button';
import useFontStyles from '@utils/styles/Font';
import UosDialog from '@components/UosDialog';

export default function FindPWDialog({onClose, open}) {
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

  return (
    <UosDialog fullWidth maxWidth='xs' onClose={onClose} open={open}>
      <DialogTitle>비밀번호 찾기</DialogTitle>
      <Container className={classes.content}>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>아이디를 입력해주세요.</Typography>
          <UosInput className={classes.inputId} type='text' label='아이디' />
        </Container>
        <Container className={classes.block}>
          <Typography className={fontClass.default}>서울시립대학교 포탈 이메일을 입력해주세요.</Typography>
          <Container className={classes.emailRow}>
            <UosInput type='text' label='이메일'/>
            <Typography className={fontClass.default}>@uos.ac.kr</Typography>
          </Container>
        </Container>
        <Button className={buttonClass.blue}>찾기</Button>
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