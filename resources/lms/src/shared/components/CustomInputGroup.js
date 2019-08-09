import React from 'react';
import {FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText,FormFeedback} from 'reactstrap';

export default ({input, type = "text", readOnly, groupText,autoFocus, placeholder, meta: {touched, error}}) => {
    const className = `${touched && error ? 'is-invalid' : ''}`;
    return (
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={groupText}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type={type} {...input} placeholder={placeholder} autoFocus={autoFocus} autoComplete="off" className={className}/>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
