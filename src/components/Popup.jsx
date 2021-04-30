/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import { popupState } from '@states/App';
import CustomDialog from './CustomDialog';

const noop = () => {};

export default function Popup() {
  const [popup, setPopup] = useRecoilState(popupState);
  const { open, title, content, isConfirm = false, onConfirm = noop, onCancel = noop } = popup;

  const closePopup = () => setPopup({ ...popup, open: false });

  const dialogProps = isConfirm ? {
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    buttons: [
      <Button color="secondary" onClick={() => { closePopup(); onCancel(); }}>아니오</Button>,
      <Button color="primary" onClick={() => { closePopup(); onConfirm(); }}>예</Button>,
    ],
  } : {
    title,
    onClose: closePopup,
    onConfirm: closePopup,
    confirmButtonText: '확인',
  };

  return (
    <CustomDialog
      open={open}
      {...dialogProps}
    >
      {content}
    </CustomDialog>
  );
}

export function useShowPopup(title, content) {
  const setPopup = useSetRecoilState(popupState);
  setPopup({
    open: true,
    title,
    content,
  });
}

export function useShowConfirm(content, onConfirm, onCancel) {
  const setPopup = useSetRecoilState(popupState);
  setPopup({
    open: true,
    isConfirm: true,
    content,
    onConfirm,
    onCancel,
  });
}
