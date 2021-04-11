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
    sm: {
        ...common,
        width: '30px',
        height: '30px'
    },
    smd: {
        ...common,
        width: '48px',
        height: '48px'
    },
    md: {
        ...common,
        width: '70px',
        height: '70px'
    },
    lg: {
        ...common,
        width: '110px',
        height: '110px'
    },
    xl: {
        ...common,
        width: '150px',
        height: '150px'
    },
    ...barStyle
});

export {
    common,
    barStyle,
    useLogoStyles
}