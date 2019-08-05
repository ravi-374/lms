import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import Select from '../../../shared/components/Select';
import settingsFormValidate from '../settings/settingsFormValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {addToast} from '../../../store/action/toastAction';
import {mapCurrencyCode} from '../../../shared/sharedMethod';

const SettingsForm = (props) => {
    const {currencies, currencySetting} = props;
    const [groupText, setGroupText] = useState(mapCurrencyCode(currencySetting ? currencySetting.id : null));
    const onSelectCurrency = (option) => {
        setGroupText(mapCurrencyCode(option.id))
    };
    const onSaveSettings = (formValues) => {
        const data = {
            key: 'currency',
            value: formValues.currencySetting.id,
            display_name: formValues.currencySetting.name
        };
        props.onSaveSettings(data);
    };
    return (
        <Row>
            <Col xs={6}>
                <Field
                    name='currencySetting'
                    label="Currency"
                    required
                    groupText={groupText}
                    options={currencies}
                    onChange={onSelectCurrency}
                    component={Select}
                    isAuto={true}
                />
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveSettings)} {...props}/>
            </Col>
        </Row>
    );
};

const form = reduxForm({form: 'settingsForm', validate: settingsFormValidate})(SettingsForm);
export default connect(null, {addToast})(form);
