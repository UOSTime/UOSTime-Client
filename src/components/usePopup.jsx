/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import { popupState } from '@states/App';
import CustomDialog from './CustomDialog';

const noop = () => {};

export default function usePopup() {
  const [popup, setPopup] = useRecoilState(popupState);
  const { open, title, content, isConfirm = false, onConfirm = noop, onCancel = noop } = popup;

  function showPopup(title, content) {
    setPopup({
      open: true,
      title,
      content,
    });
  }

  function showConfirm(content, onConfirm, onCancel) {
    setPopup({
      open: true,
      isConfirm: true,
      content,
      onConfirm,
      onCancel,
    });
  }

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

  const Popup = () => (
    <CustomDialog
      open={open}
      {...dialogProps}
    >
      {content}
    </CustomDialog>
  );

  return [Popup, showPopup, showConfirm];
}
