import React, {Fragment} from 'react';
import {
    FormGroup,
    InputGroup,
    Label,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import './Component.scss';

export default ({label, required, placeHolder, selected = '', addOnType = 'prepend', groupText = 'calendar-check-o', onChange, minDate = '', maxDate = '', todayButton = null, dayClassName = null, className = '', dateFormat = 'MMMM d, yyyy'}) => {
    const labelClass = required ? 'control-label' : '';
    return (
        <Fragment>
            <FormGroup>
                <Label className={labelClass}>{label}</Label>
                <InputGroup>
                    <InputGroupAddon addonType={addOnType}>
                        <InputGroupText><i className={`fa fa-${groupText}`}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <DatePicker placeholderText={placeHolder}
                                selected={selected}
                                onChange={onChange}
                                dateFormat={dateFormat}/>
                </InputGroup>
            </FormGroup>
        </Fragment>
    )
}
