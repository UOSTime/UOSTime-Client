import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { easeElasticOut } from 'd3-ease';
import { Box, makeStyles } from '@material-ui/core';



export default function Loading() {
    const scale = 1.1

    const setLoopState = useState(true)[1];

    const getProp = (scale, height, top, order) => {
        const o = order-1;
    
        const prop = useSpring({
            to: async (next) => {
                await next({
                    height: `${height * scale}rem`,
                    top: `${top * scale}rem`,
                    delay: 100 * o,
                    config: {
                        duration: 1200,
                        easing: easeElasticOut.amplitude(1.2)
                    }
                });
                    await next({
                        height: `${0.5 * scale}rem`,
                        top:`${0 * scale}rem`,
                        config: {
                            duration: 1200,
                            easing: easeElasticOut.amplitude(1.2)
                        }
                    });
                    if(o === 3) setLoopState(loopState => !loopState);
            },
            from: {
                height: `${0.5 * scale}rem`, 
                width:`${0.5 * scale}rem`, 
                top:`${0 * scale}rem`,
                delay: 100*o,
                backgroundColor: `white`, 
                borderRadius: `${3.5 * scale}px`,
                position: `relative`
            }
          });
    
          return prop;
    }

    const classes = useStyles();

    const firstBar = getProp(scale, 1.7, -0.4, 1, setLoopState);
    const secondBar = getProp(scale, 1.5, 0.3, 2, setLoopState);
    const thridBar = getProp(scale, 1.2, -0.2, 3, setLoopState);
    const fourthBar = getProp(scale, 0.8, 0.27, 4, setLoopState);

    return (<Box className={classes.background}>
        <animated.div style={{
        width: `80px`,
        height: `80px`,
        opacity: 0.6,
        display: `flex`, 
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `gray`,
        borderRadius: `1.2rem`,
        gap: `${0.2 * scale}rem`}} >
        <animated.div style={firstBar}></animated.div>
        <animated.div style={secondBar}></animated.div>
        <animated.div style={thridBar}></animated.div>
        <animated.div style={fourthBar}></animated.div>
    </animated.div>
    </Box>);
}

const useStyles = makeStyles({
    background: {
        position: 'fixed',
        width: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    }
});