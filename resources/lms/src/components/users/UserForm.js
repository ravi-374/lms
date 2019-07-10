import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import userValidate from './userValidate';
import './Users.scss';
import SaveAction from '../../shared/action-buttons/SaveAction';
import InputGroup from '../../shared/components/InputGroup';
import CheckBox from "../../shared/components/CheckBox";
import MultiSelect from '../../shared/multi-select/MultiSelect';

const UserForm = (props) => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(false);
    const [selectedRole] = useState(props.initialValues ? props.initialValues.selectedRole : []);
    useEffect(() => {
        if (props.initialValues) {
            if (props.initialValues.is_active) {
                setActive(props.initialValues.is_active ? props.initialValues.is_active : false)
            }
            if (props.initialValues.image) {
                setImage('/users/' + props.initialValues.image);
            }
            props.change('role_id', selectedRole[0].id);
        }

    }, []);
    const onSaveUser = (formValues) => {
        delete formValues.file_name;
        formValues.file = file;
        props.onSaveUser(formValues);
    };
    const openFileSelect = () => {
        document.getElementById('userInput').click();
    };
    const onFileChange = (event) => {
        props.change('file_name', 'file_name');
        setFile(event.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        }
    };
    const onChecked = () => {
        setActive(!isActive);
    };
    const onSelectRole = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('role_id', option[0].id);
        } else {
            props.change('role_id', null);
        }
    };
    return (
        <Row className="animated fadeIn user-form m-3">
            <Col xs={4} className="user-logo">
                <h5>User Logo</h5>
                <hr/>
                <div>
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <input id="userInput" type="file" className="d-none"
                           onChange={(e) => onFileChange(e)}/>
                    <div className="image-holder" onClick={openFileSelect}>
                        <div className="image-cover"><span
                            className="image-text">{image ? 'Change Image' : 'Add Image'}</span></div>
                        <img src={image ? image : null}
                             className="image-preview rounded mx-auto d-block" height={200} width={200}
                             alt={image}/>
                    </div>
                </div>
            </Col>
            <Col xs={8} className="primary-detail">
                <div className="d-flex">
                    <h5>Primary Details</h5>
                    <div className="ml-5 d-flex">
                        <div>
                            <Field name="is_active" checked={isActive} label="Is Active" component={CheckBox}
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
                    {!props.initialValues ?
                        <Col xs={6}>
                            <Field name="password" label="Password" type="password" required groupText="lock"
                                   component={InputGroup}/>
                        </Col> : null
                    }
                    <Col xs={6}>
                        <Field name="phone" label="Phone No." type="number" groupText="phone" component={InputGroup}/>
                    </Col>
                    {props.initialValues ?
                        <Col xs={12}>
                            <MultiSelect
                                label="Role"
                                placeholder="Select role"
                                groupText="tasks"
                                options={props.roles}
                                required
                                onSelect={onSelectRole}
                                selctedItems={selectedRole}
                            />
                            <Field name="role_id" type="hidden" component={InputGroup}/>
                        </Col> :
                        <Col xs={6}>
                            <MultiSelect
                                label="Role"
                                placeholder="Select role"
                                groupText="tasks"
                                options={props.roles}
                                required
                                onSelect={onSelectRole}
                                selctedItems={selectedRole}
                            />
                            <Field name="role_id" type="hidden" component={InputGroup}/>
                        </Col>
                    }
                </Row>
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
                        <Field name="country" label="Country" groupText="flag" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="state" label="State" groupText="square" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="city" label="City" groupText="circle" component={InputGroup}/>
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
