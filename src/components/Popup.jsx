/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { popupState } from '../states/App';
import CustomDialog from './CustomDialog';

export default function Popup() {
  const [{ open, title, content }, setPopup] = useRecoilState(popupState);
  const closePopup = () => setPopup({ open: false, title, content });

  return (
    <CustomDialog
      open={open}
      title={title}
      onClose={closePopup}
      onConfirm={closePopup}
      confirmButtonText="확인"
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
