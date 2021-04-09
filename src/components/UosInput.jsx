import { TextField, withStyles } from '@material-ui/core';
import { uosRed, uosBlue } from '@utils/styles/Colors';

const UosInput = withStyles({
    root: {
      '& label.Mui-focused': {
        color: uosRed,
      },
      '& .MuiInput-colorSecondary': {
        color: uosBlue
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: uosRed,
      },
      '& .MuiInput-underline:hover:before': {
        borderBottomColor: uosRed
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: uosRed,
        },
        '&:hover fieldset': {
          borderColor: uosRed,
        },
        '&.Mui-focused fieldset': {
          borderColor: uosRed,
        }
      },
    },
  })(TextField);


export default UosInput;