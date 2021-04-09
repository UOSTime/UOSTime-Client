import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 750,
            lg: 900,
            xl: 1200
        }
    }
});

export default theme;