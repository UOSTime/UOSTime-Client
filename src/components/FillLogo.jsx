import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: styles => ({
        width: `${styles.size}`,
        height: `${styles.size}`,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: '0'
    }),
    firstBar: {
        width: '21.65%',
        height: '73.77%',
        background: 'linear-gradient(164.04deg, #F68B7D 0%, #F7C978 100.61%, #A6C0FE 205.07%)',
        borderRadius:'500px',
        position: 'relative',
        top: '-13%'
    },
    secondBar: {
        width: '21.65%',
        height: '65.57%',
        background: 'linear-gradient(159.8deg, #F68B7D -77.35%, #F7C978 45.19%, #A6C0FE 172.42%)',
        borderRadius:'500px',
        position: 'relative',
        top: '17%'
    },
    thirdBar: {
        width: '21.65%',
        height: '53.28%',
        background: 'linear-gradient(154.42deg, #F68B7D -92.15%, #F7C978 35.1%, #A6C0FE 167.22%)',
        borderRadius:'500px',
        position: 'relative',
        top: '-13%'
    },
    fourthBar: {
        width: '21.65%',
        height: '40.98%',
        background: 'linear-gradient(148.11deg, #F68B7D -203.85%, #F7C978 -53.06%, #A6C0FE 103.49%)',
        borderRadius:'500px',
        position: 'relative',
        top: '13%'
    }
})

export default function FillLogo({size}) {
    const classes = useStyles({size});

    return (
        <Box className={classes.container}>
            <Box className={classes.firstBar}></Box>
            <Box className={classes.secondBar}></Box>
            <Box className={classes.thirdBar}></Box>
            <Box className={classes.fourthBar}></Box>
        </Box>
    )
}