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
    const displayLabel = !required ? label : null;
    return (
        <FormGroup>
            {type !== 'hidden' ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <span className="input-placeholder">
                {type !== 'hidden' ?
                    <InputGroupAddon addonType={addOnType}>
                        <InputGroupText>{customGroupText === '' ?
                            <i className={`fa fa-${groupText}`}/> : customGroupText}
                        </InputGroupText>
                    </InputGroupAddon>
                    : null
                }
                    <Input type={type} {...input} min={min} max={max} readOnly={readOnly} required={required} className={inputClass}
                           placeholder={displayLabel}
                           autoComplete="off"/>
                    {!readOnly?<div className="placeholder">{label}{required ? <span>*</span> : null}</div>:null}
                </span>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
