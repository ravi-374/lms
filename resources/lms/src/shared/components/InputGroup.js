import React from 'react';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input
} from 'reactstrap';

export default ({input, label, type = "text", required, readOnly, groupText, customGroupText = '', addOnType = 'prepend', placeholder, meta: {touched, error}}) => {
    const className = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    return (
        <FormGroup>
            {type !== 'hidden' ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                {type !== 'hidden' ?
                    <InputGroupAddon addonType={addOnType}>
                        <InputGroupText>{customGroupText === '' ?
                            <i className={`fa fa-${groupText}`}/> : customGroupText}
                        </InputGroupText>
                    </InputGroupAddon>
                    : null
                }
                <Input type={type} {...input} required={required} className={className} placeholder={label}
                       autoComplete="off"/>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
