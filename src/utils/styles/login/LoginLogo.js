import { makeStyles } from '@material-ui/core';
import { common, barStyle } from '@utils/styles/Logo';
import theme from '@utils/styles/Theme';

const useLoginLogoStyles = makeStyles({
    root: {
        [theme.breakpoints.down('md')]: {
            width: '90px',
            height: '90px'
        },
        [theme.breakpoints.between('md', 'lg')]: {
            width: '170px',
            height: '170px'
        },
        [theme.breakpoints.up('lg')]: {
            width: '300px',
            height: '300px'
        },
        ...common,
    },
    ...barStyle
});

export default useLoginLogoStyles;