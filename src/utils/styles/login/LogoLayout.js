import { makeStyles } from '@material-ui/core';
import theme from '@utils/styles/Theme';
import { neumorphismForm } from '@utils/styles/Neumorphism';

const useLogoLayoutStyles = makeStyles({
  root: {
    flexShrink: 0,
    [theme.breakpoints.down('md')]: 
      neumorphismForm.positive({
        marginTop: '20px',
        width: '165px',
        height: '165px', 
        radius: '40px', 
        distance: '15px', 
        blur: '15px', 
        direction: 'column'
      }),
    [theme.breakpoints.between('md', 'lg')]: 
      neumorphismForm.positive({
        width: '300px',
        height: '300px', 
        radius: '80px', 
        distance: '30px', 
        blur: '30px', 
        direction: 'column'
      }),
    [theme.breakpoints.up('lg')]: 
      neumorphismForm.positive({
        width: '500px', 
        height: '500px', 
        radius: '100px', 
        distance: '50px', 
        blur: '50px', 
        direction: 'column'
      })
  }
});

export default useLogoLayoutStyles;