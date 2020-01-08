import React from 'react';
import Button from '@material-ui/core/Button';

export default (props: any) => {
    return (
        <Button {...props} color="secondary" style={{fontWeight: props.fontWeight}}>{props.children}</Button>
    );
}
