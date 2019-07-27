import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import userValidate from './userValidate';
import './Users.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import TypeAhead from '../../../shared/components/TypeAhead';

const UserForm = (props) => {
    const defaultImage = 'images/user-avatar.png';
    const [image, setImage] = useState(defaultImage);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [isDeleteImage, setIsDeleteImage] = useState(false);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(true);
    const [selectedRole] = useState(props.initialValues ? props.initialValues.selectedRole : []);
    const [selectedCountry] = useState(props.initialValues ? props.initialValues.selectedCountry : []);
    const userId = props.initialValues ? props.initialValues.id : null;
    const [isValidRole, setIsValidRole] = useState(false);
    useEffect(() => {
        if (props.initialValues) {
            if (props.initialValues.is_active) {
                setActive(props.initialValues.is_active ? props.initialValues.is_active : false)
            }
            if (props.initialValues.image) {
                setImage('uploads/users/' + props.initialValues.image);
            }
            if (selectedRole.length > 0) {
                props.change('role_id', selectedRole[0].id);
            }
        } else {
            props.change('is_active', true);
        }
    }, []);
    const onSaveUser = (formValues) => {
        delete formValues.file_name;
        formValues.file = file;
        props.onSaveUser(formValues);
    };
    const onFileChange = (event) => {
        props.change('file_name', 'file_name');
        setFile(event.target.files[0]);
        setIsDefaultImage(false);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onRemovePhoto = () => {
        props.change('file_name', 'file_name');
        setFile(null);
        setImage(defaultImage);
        setIsDefaultImage(true);
        if (userId && !isDeleteImage) {
            setIsDeleteImage(true);
            apiConfig.post(`users/${userId}/remove-image`)
                .then(response => addToast({text: response.data.message}))
                .catch(({response}) => addToast({text: response.data.message}))
        }
    };
    const onChecked = () => {
        setActive(!isActive);
    };
    const onSelectRole = (option) => {
        if (option.length > 0) {
            setIsValidRole(false);
            props.change('role_id', option[0].id);
        } else {
            setIsValidRole(true);
            props.change('role_id', null);
        }
    };
    const onSelectCountry = (option) => {
        if (option.length > 0) {
            props.change('country_id', option[0].id);
        } else {
            props.change('country_id', null);
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
                        <Field name="password" label="Password" type="password" groupText="lock"
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
                            options={props.roles}
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
                            options={props.countries}
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

const userForm = reduxForm({form: 'userForm', validate: userValidate})(UserForm);
export default connect(null, {addToast})(userForm);
