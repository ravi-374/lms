import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import memberValidate from './memberValidate';
import './Members.scss';
import SaveAction from '../../shared/action-buttons/SaveAction';
import InputGroup from '../../shared/components/InputGroup';
import ToggleSwitch from '../../shared/components/ToggleSwitch';
import ImagePicker from '../../shared/image-picker/ImagePicker';
import MultiSelect from '../../shared/multi-select/MultiSelect';
import {addToast} from "../../store/actions/toastAction";
import apiConfig from '../../config/apiConfig';

const MemberForm = (props) => {
    const defaultImage = 'images/user-avatar.png';
    const [selectedMemberShipPlan] = useState(props.initialValues ? props.initialValues.selectedMemberShipPlan : []);
    const [image, setImage] = useState(defaultImage);
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [isDeleteImage, setIsDeleteImage] = useState(false);
    const [file, setFile] = useState(null);
    const [isActive, setActive] = useState(false);
    const [selectedCountry] = useState(props.initialValues ? props.initialValues.selectedCountry : []);
    const memberId = props.initialValues ? props.initialValues.id : null;
    useEffect(() => {
        if (props.initialValues) {
            if (props.initialValues.is_active) {
                setActive(props.initialValues.is_active ? props.initialValues.is_active : false)
            }
            if (props.initialValues.image) {
                setImage('uploads/members/' + props.initialValues.image);
            }
            props.change('membership_plan_id', selectedMemberShipPlan[0].id);
        }
    }, []);
    const onSaveMember = (formValues) => {
        delete formValues.file_name;
        formValues.file = file;
        props.onSaveMember(formValues);
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
        if (memberId && !isDeleteImage) {
            setIsDeleteImage(true);
            apiConfig.post(`members/${memberId}/remove-image`)
                .then(response => addToast({text: response.data.message}))
                .catch(({response}) => addToast({text: response.data.message}))
        }
    };
    const onChecked = () => {
        setActive(!isActive);
    };
    const onSelectMembershipPlan = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('membership_plan_id', option[0].id);
        } else {
            props.change('membership_plan_id', null);
        }
    };
    const onSelectCountry = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('country_id', option[0].id);
        } else {
            props.change('country_id', null);
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
                    {!props.initialValues ?
                        <Col xs={6}>
                            <Field name="password" label="Password" type="password" required groupText="lock"
                                   component={InputGroup}/>
                        </Col> : null
                    }
                    <Col xs={6}>
                        <MultiSelect
                            label=" Membership Plan"
                            placeholder="Select Membership Plan"
                            groupText="tasks"
                            options={props.membershipPlans}
                            required
                            onSelect={onSelectMembershipPlan}
                            selctedItems={selectedMemberShipPlan}
                        />
                        <Field name="membership_plan_id" type="hidden" component={InputGroup}/>
                    </Col>
                    {props.initialValues ?
                        <Col xs={12}>
                            <Field name="phone" type="number" label="Phone No." groupText="phone"
                                   component={InputGroup}/>
                        </Col> :
                        <Col xs={6}>
                            <Field name="phone" type="number" label="Phone No." groupText="phone"
                                   component={InputGroup}/>
                        </Col>
                    }
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
                        <MultiSelect
                            label="Country"
                            placeholder="Select Country"
                            groupText="flag"
                            options={props.countries}
                            onSelect={onSelectCountry}
                            selctedItems={selectedCountry}
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
