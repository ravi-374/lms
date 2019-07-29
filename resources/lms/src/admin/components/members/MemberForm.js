import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import memberValidate from './memberValidate';
import './Members.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import TypeAhead from '../../../shared/components/TypeAhead';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';

const MemberForm = (props) => {
    const {initialValues, membershipPlans, countries, change} = props;
    const [selectedMemberShipPlan] = useState(initialValues ? initialValues.selectedMemberShipPlan : []);
    const [image, setImage] = useState(publicImagePath.USER_AVATAR);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(true);
    const [selectedCountry] = useState(initialValues ? initialValues.selectedCountry : []);
    const [isValidMemberPlan, setIsValidMemberPlan] = useState(false);
    useEffect(() => {
        if (initialValues) {
            if (initialValues.is_active) {
                setActive(initialValues.is_active ? initialValues.is_active : false)
            }
            if (initialValues.image) {
                change('file_name', true);
                setImage(publicImagePathURL.MEMBER_AVATAR_URL + initialValues.image);
                setIsDefaultImage(false);
            }
            change('membership_plan_id', selectedMemberShipPlan[0].id);
        } else {
            change('is_active', true);
        }
    }, []);
    const onSaveMember = (formValues) => {
        formValues.file = file;
        props.onSaveMember(formValues);
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
    const onSelectMembershipPlan = (option) => {
        if (option.length > 0) {
            setIsValidMemberPlan(false);
            change('membership_plan_id', option[0].id);
        } else {
            setIsValidMemberPlan(true);
            change('membership_plan_id', null);
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
        <Row className="animated fadeIn member-form m-3">
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
                        <Field name="phone" type="number" label="Phone No." groupText="phone"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <TypeAhead
                            id="membership-plan"
                            label="Membership Plan"
                            required
                            options={membershipPlans}
                            placeholder="Select Membership Plan"
                            onChange={onSelectMembershipPlan}
                            groupText="tasks"
                            defaultSelected={selectedMemberShipPlan}
                            isInvalid={isValidMemberPlan}
                        />
                        <Field name="membership_plan_id" type="hidden" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="member-profile">
                <h5 className="member-profile__title">Member Profile</h5>
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
                <SaveAction onSave={props.handleSubmit(onSaveMember)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'memberForm', validate: memberValidate})(MemberForm);
