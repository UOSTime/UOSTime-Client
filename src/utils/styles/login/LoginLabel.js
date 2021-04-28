import { makeStyles } from '@material-ui/core';
import { foregroundColor } from '@utils/styles/Colors';
import theme from '@utils/styles/Theme';

const useLoginLabelStyles = makeStyles({
    root: {
        color: foregroundColor,
        [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        lineHeight: '30px'
        },
        [theme.breakpoints.between('md', 'lg')]: {
        fontSize: '40px',
        lineHeight: '50px'
        },
        [theme.breakpoints.up('lg')]: {
        fontSize: '60px',
        lineHeight: '80px',
        },
    }
});

export default useLoginLabelStyles;