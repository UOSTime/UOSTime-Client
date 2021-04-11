import React from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Button, Typography, Container } from '@material-ui/core';
import useFontStyles from '@utils/styles/Font';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  content: {
    minWidth: '360px',
  },
  container: {
    marginBottom: '10px',
  },
  button: {
    color: '#f68b7d',
  },
}))

function UOSTimeDialog({onClose, open}) {
  const classes = useStyles();
  const yearFontClasses = useFontStyles({
    fontSize: '1.3rem'
  });
  const nameFontClasses = useFontStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="dialog-slide-title"
      aria-describedby="dialog-slide-description"
    >
      <DialogTitle id="dialog-slide-title">UOSTime을 만든 사람들</DialogTitle>
      <DialogContent className={classes.content}>
        <Container className={classes.container}>
          <Typography className={yearFontClasses.red}>2013</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 김용운</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 정경성</Typography>
          <Typography className={nameFontClasses.black}>기계정보공학부 이권열</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 조인행</Typography>
        </Container>
        <Container className={classes.container}>
          <Typography className={yearFontClasses.red}>2016</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 김문섭</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 최종화</Typography>
        </Container>
        <Container className={classes.container}>
          <Typography className={yearFontClasses.red}>2018</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 강지연</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 김건호</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 위세라</Typography>
        </Container>
        <Container className={classes.container}>
          <Typography className={yearFontClasses.red}>2020</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 강동훈</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 김규희</Typography>
          <Typography className={nameFontClasses.black}>컴퓨터과학부 도형림</Typography>
        </Container>
    </DialogContent>
    <DialogActions>
      <Button className={classes.button} onClick={onClose}>
        닫기
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default UOSTimeDialog;