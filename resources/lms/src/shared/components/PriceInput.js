import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input
} from 'reactstrap';
import {fetchSettings} from '../../admin/store/actions/settingAction';
import {settingsKey} from "../../admin/constants";
import {mapCurrencyCode} from '../sharedMethod';

const PriceInput = ({input, label, type = "number", min, max, required, readOnly, placeholder, meta: {touched, error}, fetchSettings, currency}) => {
    const inputClass = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    useEffect(() => {
        fetchSettings(false);
    }, []);
    return (
        <FormGroup>
            {label ? <Label className={labelClass}>{label}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={`fa fa-${currency.length > 0 ? mapCurrencyCode(currency[0].id) : 'inr'}`}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type={type} {...input} min={min} max={max} readOnly={readOnly}
                       required={required}
                       className={inputClass} placeholder={placeholder} autoComplete="off"/>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};

const mapStateToProps = (state) => {
    const {settings} = state;
    return {
        currency: Object.values(settings).filter(setting => setting.key === settingsKey.CURRENCY)
            .map(({value}) => ({
                id: value,
            })),
    }
};

export default connect(mapStateToProps, {fetchSettings})(PriceInput);
