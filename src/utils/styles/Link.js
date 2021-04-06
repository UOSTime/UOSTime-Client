import { makeStyles } from '@material-ui/core';
import { uosRed, uosBlue, uosRedHighlight, uosBlueHighlight } from '@utils/styles/Colors';

const useLinkStyles = makeStyles({
    red: {
        fontSize: '1rem',
        color: uosRed,
        '&:hover': {
            cursor: 'pointer',
            color: uosRedHighlight,
            textDecoration: 'none'
        }
    },
    blue: {
        fontSize: '1rem',
        color: uosBlue,
        '&:hover': {
            cursor: 'pointer',
            color: uosBlueHighlight,
            textDecoration: 'none'
        }
    }
});

export default useLinkStyles;