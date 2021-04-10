import React from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  content: {
    minWidth: '360px',
  },
  button: {
    color: '#f68b7d',
  },
}))

function UOSTimeDialog({onClose, open}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="dialog-slide-title"
      aria-describedby="dialog-slide-description"
    >
      <DialogTitle id="dialog-slide-title">{"UOSTime을 만든 사람들"}</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText id="dialog-slide-description">
          <h3>2013</h3>
          컴퓨터과학부 김용운<br />
          컴퓨터과학부 정경성<br />
          기계정보공학부 이권열<br />
          컴퓨터과학부 조인행
          <h3>2016</h3>
          컴퓨터과학부 김문섭<br />
          컴퓨터과학부 최종화<br />
          <h3>2018</h3>
          컴퓨터과학부 강지연<br />
          컴퓨터과학부 김건호<br />
          컴퓨터과학부 위세라<br />
          <h3>2020</h3>
          컴퓨터과학부 강동훈<br />
          컴퓨터과학부 김규희<br />
          컴퓨터과학부 도형림
        </DialogContentText>
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