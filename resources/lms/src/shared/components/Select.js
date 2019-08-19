import React from 'react';
import Select from 'react-select';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import './Component.scss';

export default (props) => {
    const {
        input, placeholder, required, label, groupText, isSearchable = false,
        autoFocus, innerRef, defaultValue = {}, disabled, menuPlacement = "auto",
        meta: { touched, error }, options
    } = props;
    const labelClass = required ? 'control-label' : '';
    return (
        <FormGroup className="react-select">
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${groupText}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Select
                    {...input} className="react-select__input" placeholder={placeholder} value={input.value}
                    onChange={(value) => input.onChange(value)} isDisabled={disabled}
                    onBlur={() => input.onBlur(input.value)} options={options} getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id} defaultValue={defaultValue} isSearchable={isSearchable}
                    menuPlacement={menuPlacement} autoFocus={autoFocus} ref={innerRef}/>
            </InputGroup>
            {touched && ((error && <FormFeedback className="d-block">{error}</FormFeedback>))}
        </FormGroup>
    )
}
