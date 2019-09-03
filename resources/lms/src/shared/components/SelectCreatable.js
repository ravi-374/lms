import React from "react";
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import './Component.scss';
import CreatableSelect from "react-select/Creatable";

export default (props) => {
    const {
        input, placeholder, required, label, groupText, isSearchable = true,
        innerRef, disabled, menuPlacement = "auto", isCustom,
        meta: { touched, error, warning }, options, isMulti = false, isVisibleWarning = true
    } = props;

    const formGroupClass = isCustom ? 'react-select mb-0 mt-1' : 'react-select';
    const labelClass = required ? 'control-label' : '';
    const inputClass = isCustom ? 'react-select__input react-select__input--secondary' :
        'react-select__input react-select__input--primary';

    const formatCreate = inputValue => {
        return `Add New ${label ? label : 'Option'}: ${inputValue}`;
    };

    return (
        <FormGroup className={formGroupClass}>
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${groupText}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <CreatableSelect
                    {...input} className={inputClass} placeholder={placeholder} value={input.value}
                    onChange={(value) => input.onChange(value)} isDisabled={disabled} isClearable
                    onBlur={() => input.onBlur(input.value)} options={options} isSearchable={isSearchable}
                    menuPlacement={menuPlacement} ref={innerRef} isMulti={isMulti} hideSelectedOptions={false}
                    formatCreateLabel={(inputValue) => formatCreate(inputValue)}/>
            </InputGroup>
            {touched && ((error && <FormFeedback className="d-block">{error}</FormFeedback>))}
            {((!error && isVisibleWarning && warning &&
                <FormFeedback className="d-block text-success">{warning}</FormFeedback>))}
        </FormGroup>
    );
}
