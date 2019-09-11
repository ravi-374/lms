import React, {useEffect, useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import memberValidate from './memberProfileValidate';
import './MemberProfile.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import Select from "../../../shared/components/Select";

const MemberForm = (props) => {
    const { initialValues, change, countries, history } = props;
    const [image, setImage] = useState(publicImagePath.USER_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [file, setFile] = useState(null);
    const defaultImage = publicImagePath.USER_AVATAR;
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    useEffect(() => {
        if (initialValues.image) {
            change('file_name', true);
            setImage(publicImagePathURL.MEMBER_AVATAR_URL + initialValues.image);
            setIsDefaultImage(false);
        }
    }, []);
    const onSaveMemberProfile = (formValues) => {
        formValues.file = file;
        props.onSaveMemberProfile(formValues);
    };
    const onFileChange = (event) => {
        change('file_name', true);
        setFile(event.target.files[0]);
        setIsDefaultImage(false);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onRemovePhoto = () => {
        change('file_name', false);
        setFile(null);
        setImage(defaultImage);
        setIsDefaultImage(true);
    };
    const goToHomePage = () => {
        history.goBack();
    };
    const onclickPassword = (password) => {
        if (password) setPasswordHidden(!isPasswordHidden);
    };
    const onclickConfirmPassword = (password) => {
        if (password) setConfirmPasswordHidden(!isConfirmPasswordHidden);
    };
    const imagePickerOptions = { image, isDefaultImage, onRemovePhoto, onFileChange };
    return (
        <Row className="animated fadeIn member-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>Primary Details</h5>
                </div>
                <hr className={'mt-0'}/>
                <Row>
                    <Col xs={6}>
                        <Field name="first_name" label="First Name" required groupText="user-circle-o"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="last_name" label="Last Name" required groupText="user" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="email" label="Email" readOnly required groupText="envelope"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="phone" type="number" label="Phone No." groupText="phone" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="password" label="New Password" type={isPasswordHidden ? 'password' : 'text'}
                               onClick={onclickPassword} groupText="lock" isAppendIcon
                               appendGroupText={isPasswordHidden ? 'eye-slash' : 'eye'} component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="confirm_password" label="Confirm Password" onClick={onclickConfirmPassword}
                               type={isConfirmPasswordHidden ? 'password' : 'text'} groupText="lock" isAppendIcon
                               appendGroupText={isConfirmPasswordHidden ? 'eye-slash' : 'eye'} component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="member-profile">
                <h5 className="member-profile__title">Member Profile</h5>
                <hr className={'mt-0'}/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12} className="mt-2">
                <h5>Additional Details</h5>
                <hr/>
                <Row>
                    <Col xs={6}>
                        <Field name="address_1" label="Address1" groupText="address-book" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="address_2" label="Address2" groupText="address-book-o" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="city" label="City" groupText="circle" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="state" label="State" groupText="square" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="country" label="Country" options={countries} placeholder="Select Country"
                               groupText="flag" component={Select} isSearchable={true} isMini={true}
                               menuPlacement="top"/>
                    </Col>
                    <Col xs={6}>
                        <Field name="zip" label="Zip Code" groupText="map-pin" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveMemberProfile)} onCancel={goToHomePage} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({ form: 'memberForm', validate: memberValidate })(MemberForm);
