import React, {useEffect, useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import memberValidate from './memberProfileValidate';
import './MemberProfile.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import TypeAhead from '../../../shared/components/TypeAhead';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';

const MemberForm = (props) => {
    const {initialValues, change, membershipPlans, countries, history} = props;
    const [image, setImage] = useState(publicImagePath.USER_AVATAR);
    const [selectedMemberShipPlan] = useState(initialValues.selectedMemberShipPlan);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [file, setFile] = useState(null);
    const [selectedCountry] = useState(initialValues.selectedCountry);
    const defaultImage = publicImagePath.USER_AVATAR;
    const [isValidMemberPlan, setIsValidMemberPlan] = useState(false);
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
    const goToHomePage = () => {
        history.push('/');
    };
    const imagePickerOptions = {image, isDefaultImage, onRemovePhoto, onFileChange};
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
                        <Field name="phone" type="number" label="Phone No." groupText="phone"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="password" label="Password" type="password" groupText="lock"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name="confirm_password" label="Confirm Password" type="password" groupText="lock"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12}>
                        <TypeAhead
                            id="membership-plan"
                            label="Membership Plan"
                            disabled={true}
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
                <SaveAction onSave={props.handleSubmit(onSaveMemberProfile)} onCancel={goToHomePage} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'memberForm', validate: memberValidate})(MemberForm);
