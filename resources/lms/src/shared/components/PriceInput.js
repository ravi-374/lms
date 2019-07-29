import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input,
    Row, Col
} from 'reactstrap';
import {fetchSettings} from '../../admin/store/actions/settingAction';
import {settingsKey} from "../../admin/constants";
import {mapCurrencyCode} from '../sharedMethod';

const PriceInput = ({input, label, type = "number", min, max, required, readOnly, placeholder, meta: {touched, error}, fetchSettings, currency, isCustom}) => {
    const inputClass = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    const formClass = type === 'hidden' ? 'input-form-group' : '';
    useEffect(() => {
        fetchSettings(false);
    }, []);
    return (
        <FormGroup className={formClass}>
            <FormGroup className={isCustom ? `mb-0 ${inputClass}` : inputClass}>
                <div className="controls">
                    <Row>
                        <Col xs={6}>
                            {label ? <Label className={labelClass} style={{marginTop: '16px'}}>{label}</Label> : null}
                        </Col>
                        <Col xs={label ? 6 : 12}>
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
                        </Col>
                    </Row>
                </div>
            </FormGroup>
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
