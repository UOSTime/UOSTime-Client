import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

export default function MainMenu({ anchorEl, open, onClose, options }) {
  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          width: '20ch',
        },
      }}
    >
      {options.map(option => (
        <MenuItem key={option} selected={option === 'Pyxis'}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
}
