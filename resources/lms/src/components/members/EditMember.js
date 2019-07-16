import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editMember} from '../../store/actions/memberAction';
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';
import apiConfig from '../../config/apiConfig';

const EditMember = (props) => {
    const [countries, setCountries] = useState([{id: 0, name: 'Select Country'}]);
    useEffect(() => {
        apiConfig.get('countries').then(response =>
            setCountries([...countries, ...response.data.data])
        ).catch(({response}) => {
        })
    }, []);
    const onSaveMember = (formValues) => {
        formValues.roles = [];
        props.editMember(props.member.id, prepareFormData(formValues));
    };
    const {is_active, first_name, last_name, email, password, membership_plan_id, phone, address,image} = props.member;
    const changeAbleFields = {
        is_active,
        first_name,
        last_name,
        email,
        password,
        membership_plan_id,
        image,
        selectedMemberShipPlan: props.membershipPlans.filter(memberPlan => memberPlan.id === membership_plan_id),
        phone
    };
    if (countries.length <= 1) {
        return null;
    }
    if (address) {
        const {address_1, address_2, country_id, city, state, zip} = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.selectedCountry = country_id ? countries.filter(country => country.id === +country_id) : [];
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    const prepareFormOption = {
        onSaveMember,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields,
        membershipPlans: props.membershipPlans,
        countries
    };
    return <Modal {...props} content={<MemberForm {...prepareFormOption} />}/>
};

export default connect(null, {editMember})(EditMember);
