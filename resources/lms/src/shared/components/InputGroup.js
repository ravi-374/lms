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

export default ({input, label, type = "text", min, max, required, readOnly, groupText, customGroupText = '', addOnType = 'prepend', placeholder, meta: {touched, error}}) => {
    const inputClass = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    const formClass = type === 'hidden' ? 'input-form-group' : '';
    return (
        <FormGroup className={formClass}>
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
                <Input type={type} {...input} min={min} max={max} readOnly={readOnly} required={required}
                       className={inputClass} placeholder={label} autoComplete="off"/>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
