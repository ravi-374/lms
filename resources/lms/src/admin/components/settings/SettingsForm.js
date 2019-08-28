import React, {createRef, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import Select from '../../../shared/components/Select';
import InputGroup from '../../../shared/components/InputGroup';
import settingsFormValidate from '../settings/settingsFormValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {addToast} from '../../../store/action/toastAction';
import {mapCurrencyCode} from '../../../shared/sharedMethod';
import {settingsDisplayName} from "../../constants";

const SettingsForm = (props) => {
    const { currencies, initialValues } = props;
    const [groupText, setGroupText] = useState(mapCurrencyCode(initialValues.currencySetting ? initialValues.currencySetting.id : null));
    const settingRef = createRef();
    useEffect(() => {
        settingRef.current.select.focus();
    }, []);
    const onSelectCurrency = (option) => {
        setGroupText(mapCurrencyCode(option.id))
    };

    const prepareFormData = (key, value, display_name) => {
        return {
            key,
            value,
            display_name
        };
    };

    const onSaveSettings = (formValues) => {
        const { currency, issue_due_days, return_due_days } = formValues;
        const settings = [prepareFormData('currency', currency.id, currency.name),
            prepareFormData('issue_due_days', issue_due_days, settingsDisplayName.ISSUE_DUE_DAYS),
            prepareFormData('return_due_days', return_due_days, settingsDisplayName.RETURN_DUE_DAYS),
        ];
        props.onSaveSettings(settings);
    };
    return (
        <Row>
            <Col xs={6}>
                <Field name='currency' label="Currency" required groupText={groupText} options={currencies}
                       onChange={onSelectCurrency} placeholder="Select Currency" component={Select} isSearchable={true}
                       innerRef={settingRef}/>
            </Col>
            <Col xs={6}/>
            <Col xs={6}>
                <Field name='issue_due_days' type="number" label="Issue Due Days" min="0" required groupText="calendar"
                       placeholder="Issue Due Days" component={InputGroup}/>
            </Col>
            <Col xs={6}/>
            <Col xs={6}>
                <Field name='return_due_days' type="number" label="Return Due Days" min="0" required
                       groupText="calendar" placeholder="Return Due Days" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveSettings)} isHideCancel {...props}/>
            </Col>
        </Row>
    );
};

const form = reduxForm({ form: 'settingsForm', validate: settingsFormValidate })(SettingsForm);
export default connect(null, { addToast })(form);
