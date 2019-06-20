import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

export default (props) => {
    return (
        <Fragment>
            <Button color="success" onClick={props.onDelete}>Yes</Button>
            <Button color="secondary" onClick={props.onCancel}>Cancel</Button>
        </Fragment>
    );
};
