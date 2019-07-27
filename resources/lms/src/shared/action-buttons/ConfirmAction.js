import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

export default (props) => {
    return (
        <Fragment>
            <Button color="success" onClick={props.onConfirm}>Yes</Button>
            <Button color="secondary" onClick={props.onCancel}>No</Button>
        </Fragment>
    );
};
