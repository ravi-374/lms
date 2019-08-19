import React, {useState, useEffect, createRef} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import userValidate from './userValidate';
import './Users.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import Select from "../../../shared/components/Select";
import {getCurrentUser} from "../../shared/sharedMethod";

const UserForm = (props) => {
    const { initialValues, change, roles, countries } = props;
    const [image, setImage] = useState(publicImagePath.USER_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(true);
    const inputRef = createRef();
    useEffect(() => {
        if (initialValues) {
            setActive(initialValues.is_active);
            if (initialValues.image) {
                change('file_name', true);
                setImage(publicImagePathURL.USER_AVATAR_URL + initialValues.image);
                setIsDefaultImage(false);
            }
        } else {
            change('is_active', true);
            inputRef.current.focus();
        }
    }, []);
    const onSaveUser = (formValues) => {
        formValues.file = file;
        props.onSaveUser(formValues);
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
        setImage(publicImagePath.USER_AVATAR);
        setIsDefaultImage(true);
    };
    const onChecked = () => {
        setActive(!isActive);
    };
    const imagePickerOptions = { image, isDefaultImage, onRemovePhoto, onFileChange };
    const isVisibleSwitch = initialValues && initialValues.id !== getCurrentUser().id || !initialValues;
    return (
        <Row className="animated fadeIn user-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>Primary Details</h5>
                    {isVisibleSwitch ?
                        <div className="d-flex">
                            <div>
                                <Field name="is_active" checked={isActive} label="Is Active" component={ToggleSwitch}
                                       onChange={onChecked}/>
                            </div>
                        </div> : null
                    }
                </div>
                <hr className={isVisibleSwitch ? 'user-form__divider--mt-0' : 'user-form__divider--mt-10'}/>
                <Row>
                    <Col xs={6}>
                        <Field name="first_name" label="First Name" required inputRef={inputRef}
                               groupText="user-circle-o" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="last_name" label="Last Name" required groupText="user" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="email" label="Email" autoComplete={initialValues ? 'off' : 'new-email'} required
                               groupText="envelope" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name={initialValues ? 'password_new' : 'password'} label="Password"
                               required={!initialValues} autoComplete={initialValues ? 'off' : 'new-password'}
                               type="password" groupText="lock" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="phone" label="Phone No." type="number" groupText="phone" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="role" label="Role" required options={roles} placeholder="Select Role"
                               groupText="tasks" component={Select} isSearchable={true} isMini={true}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="user-profile">
                <h5 className="user-profile__title">User Profile</h5>
                <hr/>
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
                               groupText="flag" component={Select} isSearchable={true} isMini={true}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="zip" label="Zip Code" groupText="map-pin" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveUser)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({ form: 'userForm', validate: userValidate })(UserForm);
