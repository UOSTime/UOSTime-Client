import React from 'react';
import { Box } from '@material-ui/core';
import useLoginLogoStyles from '@utils/styles/login/LoginLogo';

export default function Logo() {
  const classes = useLoginLogoStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.firstBar} />
      <Box className={classes.secondBar} />
      <Box className={classes.thirdBar} />
      <Box className={classes.fourthBar} />
    </Box>
  );
}
