import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './HomeSettings.scss';
import {languageOptions} from '../../constants';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {getFormattedMessage, getFormattedOptions} from '../../../shared/sharedMethod';
import homeSettingsFormValidate from "./homeSettingsFormValidate";
import {homeSettingsDisplayName, homeSettingsKey} from "../../../constants";

const HomeSettingsForm = (props) => {
    const {
        initialValues, change, onSaveHomeSettings, handleSubmit,
    } = props;
    const settingRef = createRef();
    const bookLanguagesOptions = getFormattedOptions(languageOptions);

    useEffect(() => {
        settingRef.current.focus();
    }, []);

    const prepareFormData = (key, value, display_name) => {
        return {key, value, display_name};
    };

    const onSave = (formValues) => {
        const {facebook, github, linkedin, twitter, contact_email, contact_phone, company_description} = formValues;
        const homeSettings = [
            prepareFormData(homeSettingsKey.FACEBOOK, facebook, homeSettingsDisplayName.FACEBOOK),
            prepareFormData(homeSettingsKey.GITHUB, github, homeSettingsDisplayName.GITHUB),
            prepareFormData(homeSettingsKey.LINKEDIN, linkedin, homeSettingsDisplayName.LINKEDIN),
            prepareFormData(homeSettingsKey.TWITTER, twitter, homeSettingsDisplayName.TWITTER),
            prepareFormData(homeSettingsKey.CONTACT_EMAIl, contact_email, homeSettingsDisplayName.CONTACT_EMAIl),
            prepareFormData(homeSettingsKey.CONTACT_PHONE, contact_phone, homeSettingsDisplayName.CONTACT_PHONE),
            prepareFormData(homeSettingsKey.COMPANY_DESCRIPTION, company_description, homeSettingsDisplayName.COMPANY_DESCRIPTION),
        ];
        onSaveHomeSettings(homeSettings);
    };

    return (
        <Row className="settings">
            <Col xs={6}>
                <Field name='facebook' type="text" label="home-settings.input.facebook.label" required groupText="facebook-f"
                       component={InputGroup} inputRef={settingRef}/>
            </Col>
            <Col xs={6}>
                <Field name='github' type="text" label="home-settings.input.github.label" required groupText="github"
                       component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name='linkedin' type="text" label="home-settings.input.linkedin.label" required groupText="linkedin-in"
                       component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name='twitter' type="text" label="home-settings.input.twitter.label" required groupText="twitter"
                       component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name='contact_email' type="email" label="home-settings.input.contact_email.label" required groupText="at"
                       component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name='contact_phone' type="number" label="home-settings.input.contact_phone.label" required groupText="phone"
                       component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name='company_description' type="textarea" label="home-settings.input.company_description.label" required groupText="pen"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} isHideCancel {...props}/>
            </Col>
        </Row>
    );
};

HomeSettingsForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveHomeSettings: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const form = reduxForm({
    form: 'HomeSettingsForm',
    validate: homeSettingsFormValidate,
    enableReinitialize: true
})(HomeSettingsForm);

export default connect(null)(form);