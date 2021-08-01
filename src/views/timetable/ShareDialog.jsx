import { toPng } from 'html-to-image';
import React, { useEffect, useState } from 'react';
import CustomDialog from '@components/CustomDialog';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { TimetableElementID } from './Timetable';

export default function ShareDialog(props) {
  // props
  const { open, onClose } = props;

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const classes = useStyles();

  // states
  const [imageSrc, setImageSrc] = useState('');
  const [imageResolutionWidth, setImageResolutionWidth] = useState(screenWidth);
  const [imageResolutionHeight, setImageResolutionHeight] = useState(screenHeight);

  // TODO: use debounce
  // generate timetable image
  useEffect(async () => {
    if (!open) return;

    // find the timetable element
    const timetableElement = document.getElementById(TimetableElementID);

    // get real size of timetable in pixel
    // const beforeWidth = parseInt(window.getComputedStyle(timetableElement).width);
    const beforeHeight = parseInt(window.getComputedStyle(timetableElement).height);

    // resize timetable (fix height)
    timetableElement.style.width = `${Math.floor(beforeHeight * (imageResolutionWidth / imageResolutionHeight))}px`;

    // configure option for rendering
    const option = {
      canvasWidth: imageResolutionWidth,
      canvasHeight: imageResolutionHeight,
    };

    // generate image
    const src = await toPng(timetableElement, option);

    // revert timetable size
    timetableElement.style.width = '';

    setImageSrc(src);
  }, [open, imageResolutionWidth, imageResolutionHeight]);

  return (
    <CustomDialog
      open={open}
      title="시간표 이미지로 내보내기"
      onClose={onClose}
      buttons={[]}
      maxWidth="lg"
      fullWidth
    >
      <Box className={classes.root}>
        <img src={imageSrc} alt="시간표 이미지" className={classes.image} />
        <Box className={classes.controlBox}>
          <Box>
            <Box>
              <Typography variant="h6" component="h3">이미지 해상도 변경</Typography>
              <Typography color="textSecondary" variant="body2">기기 해상도: {screenWidth} * {screenHeight}</Typography>
            </Box>
            <Box className={classes.inputBox}>
              <TextField
                type="number"
                label="너비(width)"
                variant="standard"
                value={imageResolutionWidth}
                onChange={e => setImageResolutionWidth(e.target.value)}
                required
              />
              <TextField
                type="number"
                label="높이(height)"
                variant="standard"
                value={imageResolutionHeight}
                onChange={e => setImageResolutionHeight(e.target.value)}
                required
              />
            </Box>
          </Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.saveButton}
            href={imageSrc}
            download="timetable.png"
            onClick={onClose}
          >
            저장
          </Button>
        </Box>
      </Box>
    </CustomDialog>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    padding: '1em 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxHeight: '80vh',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  image: {
    objectFit: 'contain',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto',
    boxShadow: '0 0.5em 1em rgba(0, 0, 0, .2)',
    overflow: 'hidden',
    borderRadius: '0.5em',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '40vh',
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: '80vh',
      maxWidth: '60%',
    },
  },
  controlBox: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '3em',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      marginLeft: '1.5em',
    },
  },
  inputBox: {
    display: 'flex',
    margin: '1em 0',
    gap: '1em',
    '& > *': {
      width: '50%',
    },
  },
  saveButton: {
    display: 'block',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2em',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 'auto',
    },
  },
}));
