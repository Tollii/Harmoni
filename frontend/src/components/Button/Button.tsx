import React from 'react';
import MatButton from '@material-ui/core/Button';

interface Button {
    fontWeight:number;
    children:any;
}

export default function Button(props:any, {fontWeight, children}: Button){
    return (
        <MatButton {...props} color="secondary" style={{fontWeight: fontWeight}}>{children}</MatButton>
    );
}
