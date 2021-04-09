import { makeStyles } from '@material-ui/core';
import { uosRed, uosYellow, uosBlue } from '@utils/styles/Colors';

const useButtonStyles = makeStyles({
    red: styles => ({
        background: `linear-gradient(145deg, ${uosRed} 30%, ${uosRed} 90%)`,
        borderRadius: '100px',
        border: 0,
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        height: 48,
        width: '100%',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        ...styles
    }),
    blue: styles => ({
        background: `linear-gradient(145deg, ${uosBlue} 30%, ${uosBlue} 90%)`,
        borderRadius: '100px',
        border: 0,
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        height: 48,
        width: '100%',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        ...styles
    }),
    linearRed: styles => ({
        background: `linear-gradient(145deg, ${uosRed} 30%, ${uosYellow} 90%)`,
        borderRadius: '100px',
        border: 0,
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        height: 48,
        width: '100%',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        ...styles
    }),
    linearBlue: styles => ({
        background: `linear-gradient(145deg, ${uosBlue} 30%, ${uosYellow} 90%)`,
        borderRadius: '100px',
        border: 0,
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        height: 48,
        width: '100%',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        ...styles
    }),
});

export default useButtonStyles;