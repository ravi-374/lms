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
        meta: { touched, error }, options, isAuto = false, isMini = false
    } = props;
    const labelClass = required ? 'control-label' : '';
    let reactSelectInputClass = isAuto ? 'react-select__input react-select__input--inline' : 'react-select__input react-select__input--modal';
    reactSelectInputClass = isMini ? 'react-select__input react-select__input--mini' : reactSelectInputClass;
    return (
        <FormGroup className="react-select">
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup style={{ display: '-webkit-inline-box' }}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${groupText}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Select
                    {...input} className={reactSelectInputClass} placeholder={placeholder} value={input.value}
                    onChange={(value) => input.onChange(value)} isDisabled={disabled}
                    onBlur={() => input.onBlur(input.value)} options={options} getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id} defaultValue={defaultValue} isSearchable={isSearchable}
                    menuPlacement={menuPlacement} autoFocus={autoFocus} ref={innerRef}/>
            </InputGroup>
            {touched && ((error && <FormFeedback className="d-block">{error}</FormFeedback>))}
        </FormGroup>
    )
}
