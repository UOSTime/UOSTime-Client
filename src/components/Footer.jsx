import React from 'react';
import { makeStyles, Container, Typography, Link } from '@material-ui/core';
import ContactDialog from './ContactDialog';
import UOSTimeDialog from './UOSTimeDialog';

const useStyles = makeStyles(theme => ({
  footer: {
    paddingLeft: '5px',
    paddingRight: '5px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '##f6f6f6',
    color: '#4e4e4e',
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
  },
  firstBox: {
    width: '50%',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  secondBox: {
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
  const [contactOpen, setContactOpen] = React.useState(false);
  const [uostimeOpen, setUostimeOpen] = React.useState(false);

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
    <Container maxWidth="lg" className={classes.footer}>
      <Container className={classes.firstBox}>
        <Link name="UOS" className={classes.font} underline="none" href="https://uos.ac.kr">서울시립대학교</Link>{' | '}
        <Link name="Contact" className={classes.font} underline="none" onClick={contactDialogOpen}>문의하기</Link>{' | '}
        <Link name= "TermsOfService" className={classes.font} underline="none" href="https://uostime.herokuapp.com/terms_of_service">이용약관</Link>{' | '}
        <Link name="PrivacyPolicy" className={classes.font} underline="none" href="/privacy_policy">개인정보처리방침</Link>
      </Container>
      <Container className={classes.secondBox}>
        {' ©'}
        <Link name="UOSTime" className={classes.font} underline="none" onClick={uostimeDialogOpen}> UOSTime Team </Link>
        {' v2.0.0'}
      </Container>
      <ContactDialog  onClose={contactDialogClose} open={contactOpen} />
      <UOSTimeDialog onClose={uostimeDialogClose} open={uostimeOpen} />
    </Container>
  );
}

export default Footer;
