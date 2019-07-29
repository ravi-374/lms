import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import TypeAhead from '../../../shared/components/TypeAhead';
import InputGroup from '../../../shared/components/InputGroup';
import settingsFormValidate from '../settings/settingsFormValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {addToast} from '../../../store/action/toastAction';
import {mapCurrencyCode} from '../../../shared/sharedMethod';

const SettingsForm = (props) => {
    const {currencies, selectedCurrency} = props;
    const [isInValidaCurrency, setIsInInValidaCurrency] = useState(false);
    const [groupText, setGroupText] = useState(mapCurrencyCode(selectedCurrency[0].id));
    const onSelectCurrency = (options) => {
        if (options.length > 0) {
            props.change('currencySetting', [options[0]]);
            setGroupText(mapCurrencyCode(options[0].id));
            setIsInInValidaCurrency(false)
        } else {
            props.change('currencySetting', null);
            setIsInInValidaCurrency(true);
        }
    };
    const onSaveSettings = (formValues) => {
        const data = {
            key: 'currency',
            value: formValues.currencySetting[0].id,
            display_name: formValues.currencySetting[0].name
        };
        props.onSaveSettings(data);
    };
    return (
        <Row>
            <Col xs={12}>
                <TypeAhead
                    id="currency"
                    label="Currency"
                    required
                    options={currencies}
                    placeholder="Select Currency"
                    onChange={onSelectCurrency}
                    groupText={groupText}
                    isInvalid={isInValidaCurrency}
                    defaultSelected={selectedCurrency}
                    dropUp={false}
                />
                <Field name='currencySetting' type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveSettings)} {...props}/>
            </Col>
        </Row>
    );
};

const form = reduxForm({form: 'settingsForm', validate: settingsFormValidate})(SettingsForm);
export default connect(null, {addToast})(form);
