import { Dialog, withStyles } from '@material-ui/core';
import { uosBlue, backgroundColor } from '@utils/styles/Colors';

const UosDialog = withStyles({
    root: {
      '& .MuiDialog-paper': {
        color: uosBlue,
        backgroundColor: backgroundColor,
        borderRadius: '30px'
      }
    },
  })(Dialog);


export default UosDialog;