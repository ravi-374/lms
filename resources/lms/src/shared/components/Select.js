import React, {Fragment} from 'react';
import {
    FormFeedback, FormGroup, InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input, Label
} from 'reactstrap';

export default ({input, label, type = "select", required, disabled, isCustom, addOnType = "prepend", groupText, customGroupText = "", meta: {touched, error, warning}, options, defaultOption}) => {
    const selectClass = `${touched && error ? 'is-invalid' : ''} ${isCustom ? 'custom-select' : ' '}`;
    const labelClass = required ? 'control-label' : '';
    return (
        <FormGroup className={isCustom ? 'mb-0' : ''}>
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType={addOnType}>
                    <InputGroupText>{customGroupText === '' ?
                        <i className={`fa fa-${groupText}`}/> : customGroupText}
                    </InputGroupText>
                </InputGroupAddon>
                <Input type={type} {...input} className={selectClass} placeholder={label} disabled={disabled}
                       autoComplete="off">
                    <option value="">{defaultOption}</option>
                    {options.map((option, index) =>
                        (
                            <Fragment key={index}>
                                <option value={option.id}>{option.name}</option>
                            </Fragment>
                        )
                    )}
                </Input>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};
