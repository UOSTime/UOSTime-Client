import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function FindPWDialog({onClose, open}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>아이디 찾기</DialogTitle>
      <div>
        <input type='text' placeholder='아이디' />
        <input type='text' placeholder='UOS portal 아이디'/>
      </div>
      <button>찾기</button>
    </Dialog>
  );
}