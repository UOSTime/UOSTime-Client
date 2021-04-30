/* eslint-disable no-nested-ternary */
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getUniqueID } from '@utils/id';

const noop = () => {};

export default function CustomDialog(props) {
  // props
  const {
    open = true,
    isForm = false,
    title,
    onClose = noop,
    onSubmit = noop,
    onConfirm = noop,
    buttons,
    children,
    confirmButtonText, // optional
    submitButtonText, // optional
    ...dialogProps
  } = props;

  // id
  const [
    dialogTitleID,
  ] = getUniqueID(1);

  const dialogContent = <DialogContent>{children}</DialogContent>;
  const primaryButton = isForm
    ? (submitButtonText ? <Button color="primary" type="submit">{submitButtonText}</Button> : null)
    : (confirmButtonText ? <Button color="primary" type="button" onClick={onConfirm}>{confirmButtonText}</Button> : null);
  const dialogActions = <DialogActions>{buttons}{primaryButton}</DialogActions>;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={dialogTitleID} {...dialogProps}>
      {title && <DialogTitle id={dialogTitleID}>{title}</DialogTitle>}
      { isForm ? (
        <form onSubmit={onSubmit}>
          {dialogContent}
          {dialogActions}
        </form>
      ) : (
        <>
          {dialogContent}
          {dialogActions}
        </>
      )}
    </Dialog>
  );
}
