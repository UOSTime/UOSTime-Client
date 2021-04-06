import { makeStyles } from '@material-ui/core';
import { uosRed, uosBlue, foregroundColor } from '@utils/styles/Colors';

const useFontStyles = makeStyles({
    default: styles => ({
        color: foregroundColor,
        fontSize: '1rem',
        ...styles
    }),
    red: styles => ({
        color: uosRed,
        fontSize: '1rem',
        ...styles
    }),
    blue: styles => ({
        color: uosBlue,
        fontSize: '1rem',
        ...styles
    })
});

export default useFontStyles;