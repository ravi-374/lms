import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import userValidate from './userValidate';
import './Users.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import TypeAhead from '../../../shared/components/TypeAhead';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';

const UserForm = (props) => {
    const {initialValues, change, roles, countries} = props;
    const [image, setImage] = useState(publicImagePath.USER_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(true);
    const [selectedRole] = useState(initialValues ? initialValues.selectedRole : []);
    const [selectedCountry] = useState(initialValues ? initialValues.selectedCountry : []);
    const [isValidRole, setIsValidRole] = useState(false);
    useEffect(() => {
        if (initialValues) {
            if (initialValues.is_active) {
                setActive(initialValues.is_active ? initialValues.is_active : false)
            }
            if (initialValues.image) {
                change('file_name', true);
                setImage(publicImagePathURL.USER_AVATAR_URL + initialValues.image);
                setIsDefaultImage(false);
            }
            if (selectedRole.length > 0) {
                change('role_id', selectedRole[0].id);
            }
        } else {
            change('is_active', true);
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
    const onSelectRole = (option) => {
        if (option.length > 0) {
            setIsValidRole(false);
            change('role_id', option[0].id);
        } else {
            setIsValidRole(true);
            change('role_id', null);
        }
    };
    const onSelectCountry = (option) => {
        if (option.length > 0) {
            change('country_id', option[0].id);
        } else {
            change('country_id', null);
        }
    };
    const imagePickerOptions = {image, isDefaultImage, onRemovePhoto, onFileChange};
    return (
        <Row className="animated fadeIn user-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>Primary Details</h5>
                    <div className="d-flex">
                        <div>
                            <Field name="is_active" checked={isActive} label="Is Active" component={ToggleSwitch}
                                   onChange={onChecked}/>
                        </div>
                    </div>
                </div>
                <hr style={{marginTop: '0px'}}/>
                <Row>
                    <Col xs={6}>
                        <Field name="first_name" label="First Name" required groupText="user-circle-o"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="last_name" label="Last Name" required groupText="user" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="email" label="Email" required groupText="envelope" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name={initialValues ? 'password_new' : 'password'} label="Password"
                               required={!initialValues} type="password" groupText="lock"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="phone" label="Phone No." type="number" groupText="phone" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="role"
                            label="Role"
                            required
                            options={roles}
                            placeholder="Select Role"
                            onChange={onSelectRole}
                            groupText="tasks"
                            defaultSelected={selectedRole}
                            isInvalid={isValidRole}
                        />
                        <Field name="role_id" type="hidden" component={InputGroup}/>
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
                        <TypeAhead
                            id="country"
                            label="Country"
                            options={countries}
                            placeholder="Select Country"
                            onChange={onSelectCountry}
                            groupText="flag"
                            defaultSelected={selectedCountry}
                            dropUp={true}
                        />
                        <Field name="country_id" type="hidden" component={InputGroup}/>
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

export default reduxForm({form: 'userForm', validate: userValidate})(UserForm);
