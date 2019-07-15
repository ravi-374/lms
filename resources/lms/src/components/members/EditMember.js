import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editMember} from '../../store/actions/memberAction';
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';

const EditMember = (props) => {
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
    if (address) {
        const {address_1, address_2, country, city, state, zip} = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.country = country ? country : '';
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    const prepareFormOption = {
        onSaveMember,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields,
        membershipPlans: props.membershipPlans
    };
    return <Modal {...props} content={<MemberForm {...prepareFormOption} />}/>
};

export default connect(null, {editMember})(EditMember);
