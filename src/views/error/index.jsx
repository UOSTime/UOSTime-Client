import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import React from 'react';
import useFontStyles from '@utils/styles/Font';
import useButtonStyles from '@utils/styles/Button';
import theme from '@utils/styles/Theme';
import failLogo from '@img/fontawesome/logo-fail.svg';
import { Redirect, useHistory } from 'react-router';

export default function Error() {

    const history = useHistory();

    const onClick = () => {
        history.push('/');
    }

    const buttonClasses = useButtonStyles({
        width: '100px',
        fontSize: '1.3rem',
    });
    const H1FontClasses = useFontStyles({
        fontSize: '4rem',
        paddingBottom: '20px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.6rem'
        }
    });
    const ErrorFontClasses = useFontStyles({
        fontSize: '1.3rem',
        fontWeight: 'bold',
        paddingBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    });
    const fontClasses = useFontStyles({
        paddingBottom: '10px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    });
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Container className={classes.contents}>
                <Typography className={H1FontClasses.black}>앗! 여기가 어디죠?</Typography>
                <Typography className={ErrorFontClasses.black}>Error Code: 404 Not Found</Typography>
                <Typography className={fontClasses.black}>홈으로 돌아가시겠어요?</Typography>
                <Button className={buttonClasses.linearRed} onClick={onClick}>Home</Button>
            </Container>
            <Container className={classes.logo}>
                <img src={failLogo} />
            </Container>
        </Container>
    )
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px'
    },
    contents: {
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center'
        }
    },
    logo: {
        width: '80%',
        alignSelf: 'flex-end',
        margin: '0px 10px 0px 0px'
    },
});