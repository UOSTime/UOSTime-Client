import React, { useState } from 'react';
import { makeStyles, Container, Link, Box } from '@material-ui/core';
import ContactDialog from './ContactDialog';
import UOSTimeDialog from './UOSTimeDialog';

const useStyles = makeStyles(theme => ({
  footer: {
    borderTop: '1px solid #e0e0e0',
    padding: '1em',
    margin: 'auto 0 0 0',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    color: '#4e4e4e',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      fontSize: '12px',
    },
  },
  font: {
    color: '#4e4e4e',
    cursor: 'pointer',
    '&:hover': {
      color: '#f68b7d',
    },
    padding: '0.5em',
  },
  firstContainer: {
    width: '50%',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  secondContainer: {
    width: '50%',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const [contactOpen, setContactOpen] = useState(false);
  const [uostimeOpen, setUostimeOpen] = useState(false);

  const contactDialogOpen = () => {
    setContactOpen(true);
  };
  const contactDialogClose = () => {
    setContactOpen(false);
  };
  const uostimeDialogOpen = () => {
    setUostimeOpen(true);
  };
  const uostimeDialogClose = () => {
    setUostimeOpen(false);
  };

  return (
    <Box maxWidth="lg" className={classes.footer}>
      <Container className={classes.firstContainer}>
        <Link name="UOS" className={classes.font} underline="none" href="https://uos.ac.kr">서울시립대학교</Link>{' | '}
        <Link name="Contact" className={classes.font} underline="none" onClick={contactDialogOpen}>문의하기</Link>{' | '}
        <Link name= "TermsOfService" className={classes.font} underline="none" href="/terms_of_service">이용약관</Link>{' | '}
        <Link name="PrivacyPolicy" className={classes.font} underline="none" href="/privacy_policy">개인정보처리방침</Link>
      </Container>
      <Container className={classes.secondContainer}>
        <Box component="span">
          ©<Link name="UOSTime" className={classes.font} underline="none" onClick={uostimeDialogOpen}>UOSTime Team</Link> v2.0.0
        </Box>
      </Container>
      <ContactDialog onClose={contactDialogClose} open={contactOpen} />
      <UOSTimeDialog onClose={uostimeDialogClose} open={uostimeOpen} />
    </Box>
  );
}

export default Footer;
