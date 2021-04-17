import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { uosRed } from '@utils/styles/Colors';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function CreateTimeTable({onClick}) {
    const classes = useStyles();

    return (
        <Container className={classes.root} onClick={onClick}>
            <AddBoxIcon className={classes.icon} />
        </Container>
    );
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '24%',
        padding: '0',
        borderRadius: '20px',
        marginBottom: '1%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            backgroundColor: uosRed,
            cursor: 'pointer'
        }
    },
    icon: {
        fontSize: '5rem'
    }
})