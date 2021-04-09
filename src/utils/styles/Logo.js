import { makeStyles } from '@material-ui/core';

const common = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: '0'
}

const barStyle = {
    firstBar: {
        width: '22%',
        height: '75%',
        background: 'linear-gradient(164.04deg, #F68B7D 0%, #F7C978 100.61%, #A6C0FE 205.07%)',
        borderRadius:'500px',
        position: 'relative',
        top: '-13%'
    },
    secondBar: {
        width: '22%',
        height: '65%',
        background: 'linear-gradient(159.8deg, #F68B7D -77.35%, #F7C978 45.19%, #A6C0FE 172.42%)',
        borderRadius:'500px',
        position: 'relative',
        top: '17%'
    },
    thirdBar: {
        width: '22%',
        height: '55%',
        background: 'linear-gradient(154.42deg, #F68B7D -92.15%, #F7C978 35.1%, #A6C0FE 167.22%)',
        borderRadius:'500px',
        position: 'relative',
        top: '-13%'
    },
    fourthBar: {
        width: '22%',
        height: '40%',
        background: 'linear-gradient(148.11deg, #F68B7D -203.85%, #F7C978 -53.06%, #A6C0FE 103.49%)',
        borderRadius:'500px',
        position: 'relative',
        top: '13%'
    }
}

const useLogoStyles = makeStyles({
    small: {
        ...common,
        width: '40px',
        height: '40px'
    },
    medium: {
        ...common,
        width: '100px',
        height: '100px'
    },
    large: {
        ...common,
        width: '200px',
        height: '200px'
    },
    xlarge: {
        ...common,
        width: '300px',
        height: '300px'
    },
    ...barStyle
});

export {
    common,
    barStyle,
    useLogoStyles
}