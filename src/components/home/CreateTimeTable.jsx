import React from 'react';
import { Container } from '@material-ui/core';

export default function CreateTimeTable({onClick}) {
    
    return (
        <Container onClick={onClick}>
            추가
        </Container>
    );
}