import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

export default ({input, label, value, checked = false, type = 'checkbox'}) => {
    return (
        <FormGroup className="form-check">
            <Label className="form-check-label">
                <Input type={type} checked={checked} {...input} className="form-check-input"/>{label}
            </Label>
        </FormGroup>
    );
};
