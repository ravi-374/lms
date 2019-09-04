import React, {createRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import Select from '../../../shared/components/Select';
import InputGroup from '../../../shared/components/InputGroup';
import settingsFormValidate from '../settings/settingsFormValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {addToast} from '../../../store/action/toastAction';
import {mapCurrencyCode} from '../../../shared/sharedMethod';
import {settingsDisplayName, settingsKey} from "../../constants";
import ImagePicker from "../../../shared/image-picker/ImagePicker";
import {publicImagePath} from "../../../appConstant";
import './Settings.scss';

const SettingsForm = (props) => {
    const { currencies, initialValues, changeFile } = props;
    const [groupText, setGroupText] = useState(mapCurrencyCode(initialValues.currency ? initialValues.currency.id : null));
    const settingRef = createRef();
    const [image, setImage] = useState(publicImagePath.APP_LOGO);
    const [isDefaultImage, setIsDefaultImage] = useState(true);

    useEffect(() => {
        settingRef.current.focus();
        if (initialValues.library_logo !== '' && initialValues.library_logo !== null) {
            setImage(initialValues.library_logo);
            setIsDefaultImage(false);
        }
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

    const onFileChange = (event) => {
        changeFile(event.target.files[0]);
        setIsDefaultImage(false);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };

    const onRemovePhoto = () => {
        changeFile(null);
        setImage(publicImagePath.USER_AVATAR);
        setIsDefaultImage(true);
    };

    const imagePickerOptions = {
        image,
        isDefaultImage,
        buttonName: 'Logo',
        onRemovePhoto,
        onFileChange,
        isRemoveOption: false
    };

    const onSaveSettings = (formValues) => {
        const { currency, issue_due_days, return_due_days, library_name } = formValues;
        const settings = [
            prepareFormData(settingsKey.CURRENCY, currency.id, currency.name),
            prepareFormData(settingsKey.LIBRARY_NAME, library_name, settingsDisplayName.APP_NAME),
            prepareFormData(settingsKey.ISSUE_DUE_DAYS, issue_due_days, settingsDisplayName.ISSUE_DUE_DAYS),
            prepareFormData(settingsKey.RETURN_DUE_DAYS, return_due_days, settingsDisplayName.RETURN_DUE_DAYS),
        ];
        props.onSaveSettings(settings);
    };

    return (
        <Row className="settings">
            <Col xs={2} className="settings__logo">
                <h6 className="settings__logo-heading">Logo</h6>
                <div>
                    <Field name="library_logo" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={10} className="settings__form">
                <Row className="settings__form-columns">
                    <Col xs={6}>
                        <Field name='library_name' type="text" label="App Name" required groupText="list"
                               placeholder="App Name" component={InputGroup} inputRef={settingRef}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='currency' label="Currency" required groupText={groupText} options={currencies}
                               onChange={onSelectCurrency} placeholder="Select Currency" component={Select}
                               isSearchable={true}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='issue_due_days' type="number" label="Issue/Reserve Due Days" min="0" required
                               groupText="calendar" placeholder="Issue Due Days" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='return_due_days' type="number" label="Return Due Days" min="0" required
                               groupText="calendar" placeholder="Return Due Days" component={InputGroup}/>
                    </Col>
                    <Col xs={12}>
                        <SaveAction onSave={props.handleSubmit(onSaveSettings)} isHideCancel {...props}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const form = reduxForm({ form: 'settingsForm', validate: settingsFormValidate })(SettingsForm);
export default connect(null, { addToast })(form);
