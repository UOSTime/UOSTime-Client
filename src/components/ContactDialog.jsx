import React from 'react';
import { makeStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  title: {
    color: '#4e4e4e',
  },
  content: {
    color: '#4e4e4e',
  },
  button: {
    color: '#f68b7d',
  }
}))

function ContactDialog({onClose, open}) {
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
      <DialogTitle id="dialog-slide-title" className={classes.title}>{"문의하기"}</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText id="dialog-slide-description">
          문의사항은 아래 메일로 보내주세요! <br /><br />
          uostime@gmail.com
        </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} className={classes.button}>
        알겠습니다
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default ContactDialog;