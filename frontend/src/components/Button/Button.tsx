import React from 'react';
import MatButton from '@material-ui/core/Button';

export default function Button(props: any){
    return (
        <MatButton {...props} color="secondary" style={{fontWeight: props.fontWeight}}>{props.children}</MatButton>
    );
}
