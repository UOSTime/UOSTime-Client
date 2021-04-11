import React from 'react';
import { Box } from '@material-ui/core';
import { useLogoStyles } from '@utils/styles/Logo';


// size: small, medium, large, xlarge
export default function FillLogo({size}) {
    const logoClasses = useLogoStyles();

    return (
        <Box className={logoClasses[size ? size : 'sm']}>
            <Box className={logoClasses.firstBar}></Box>
            <Box className={logoClasses.secondBar}></Box>
            <Box className={logoClasses.thirdBar}></Box>
            <Box className={logoClasses.fourthBar}></Box>
        </Box>
    )
}