import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editMember} from '../../store/actions/memberAction';
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';
import apiConfig from '../../config/apiConfig';

const EditMember = (props) => {
    const [countries, setCountries] = useState([]);
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
    const {id, is_active, first_name, last_name, email, password, membership_plan_id, phone, address, image} = props.member;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
        membership_plan: props.membershipPlans.find(memberPlan => memberPlan.id === membership_plan_id),
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
    if (!address) {
        changeAbleFields.selectedCountry = [];
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
