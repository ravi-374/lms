import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editMembershipPlan} from '../../store/actions/membershipPlanAction';
import MembershipPlanForm from './MembershipPlanForm';
import {membershipPlanFrequencyOptions} from '../../constants';

const EditMembershipPlan = (props) => {
    const onSaveMembershipPlan = (formValues) => {
        props.editMembershipPlan(props.membershipPlan.id, formValues);
    };
    const {name, membership_plan_id, price, frequency, stripe_plan_id, description} = props.membershipPlan;
    const changeAbleFields = {
        name, membership_plan_id, price, frequency, stripe_plan_id, description,
        selectedFrequency: membershipPlanFrequencyOptions.filter(option => option.id === frequency)
    };
    const prepareFormOption = {
        onSaveMembershipPlan,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields
    };
    return <Modal {...props} content={<MembershipPlanForm {...prepareFormOption} />}/>
};

export default connect(null, {editMembershipPlan})(EditMembershipPlan);
