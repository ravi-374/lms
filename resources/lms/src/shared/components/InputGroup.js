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
import './Component.scss';

export default ({
                    input, label, type = "text", min, max, required, readOnly, autoComplete = "off", onClick,
                    inputRef, groupText, customGroupText = '', addOnType = 'prepend', placeholder, meta: { touched, error },
                    isAppendIcon, appendGroupText
                }) => {
    const inputClass = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    const formClass = type === 'hidden' ? 'input-form-group' : '';
    placeholder = placeholder ? placeholder : label;
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
                <Input type={type} {...input} min={min} max={max} readOnly={readOnly} innerRef={inputRef}
                       required={required} className={inputClass} placeholder={placeholder}
                       autoComplete={autoComplete}/>
                {isAppendIcon ? <InputGroupText className="cursor-pointer" onClick={() => onClick(input.value)}> <i
                    className={`fa fa-${appendGroupText}`}/></InputGroupText> : null}
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
