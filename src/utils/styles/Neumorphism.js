import { makeStyles } from '@material-ui/core';

const neumorphismStyles = {
    positive: styles => ({
        ...styles,
    }),
    negative: styles => ({
        ...styles,
    })
};

const neumorphismForm = {
    positive: (styles) => ({
        ...styles,
        backgroundColor: '#F2F2F2',
        borderRadius: `${styles.radius || '20px'}`,
        boxShadow: `${styles.distance || '10px'} ${styles.distance || '10px'} ${styles.blur} #CFCFCF,
                    -${styles.distance || '10px'} -${styles.distance || '10px'} ${styles.blur} #FFFFFF`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: `${styles.direction || 'row'}`
    }),
    negative: (styles) => ({
        ...styles,
        backgroundColor: '#F2F2F2',
        borderRadius: `${styles.radius || '20px'}`,
        boxShadow: `inset ${styles.distance || '10px'} ${styles.distance || '10px'} ${styles.blur || '8px'} #CFCFCF,
                    inset -${styles.distance || '10px'} -${styles.distance || '10px'} ${styles.blur || '8px'} #FFFFFF`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: `${styles.direction || 'row'}`
    })
};

export {
    neumorphismForm,
    neumorphismStyles
}