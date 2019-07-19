import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import './Component.scss';

export default ({id, label, reference = null, required, valueKey = 'id', labelKey = 'name', disabled = false, labelText, dropUp = false, multiple = false, onChange, filterBy = [], groupText, validationState, isInvalid = false, isValid, options, defaultSelected, placeholder}) => {
    const labelClass = required ? 'control-label' : '';
    return (
        <FormGroup validationstate={validationState}>
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${groupText}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Typeahead
                    id={id}
                    ref={reference}
                    isInvalid={isInvalid}
                    multiple={multiple}
                    options={options}
                    valueKey={valueKey}
                    labelKey={labelKey}
                    placeholder={placeholder}
                    onChange={onChange}
                    defaultSelected={defaultSelected}
                    dropup={dropUp}
                    disabled={disabled}
                />
                {isInvalid ?
                    <FormFeedback
                        style={{display: 'block'}}>{`${label || labelText} must be required.`}</FormFeedback> : null}
            </InputGroup>
        </FormGroup>
    )
}
