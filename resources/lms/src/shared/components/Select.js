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
        input, placeholder, required, label, groupText, isSearchable = false
        , innerRef, defaultValue = {}, disabled, menuPlacement = "auto", isCustom,
        meta: { touched, error }, options, isMulti = false
    } = props;
    const formGroupClass = isCustom ? 'react-select mb-0 mt-1' : 'react-select';
    const labelClass = required ? 'control-label' : '';
    const inputClass = isCustom ? 'react-select__input react-select__input--secondary' :
        'react-select__input react-select__input--primary';
    return (
        <FormGroup className={formGroupClass}>
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${groupText}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Select
                    {...input} className={inputClass} placeholder={placeholder} value={input.value}
                    onChange={(value) => input.onChange(value)} isDisabled={disabled}
                    onBlur={() => input.onBlur(input.value)} options={options} getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id} defaultValue={defaultValue} isSearchable={isSearchable}
                    menuPlacement={menuPlacement} ref={innerRef} isMulti={isMulti}/>
            </InputGroup>
            {touched && ((error && <FormFeedback className="d-block">{error}</FormFeedback>))}
        </FormGroup>
    )
}
