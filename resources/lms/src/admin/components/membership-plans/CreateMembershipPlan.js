import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addMembershipPlan} from '../../store/actions/membershipPlanAction';
import MembershipPlanForm from './MembershipPlanForm';

const CreateMembershipPlan = (props) => {
    const onSaveMembershipPlan = (formValues) => {
        props.addMembershipPlan(formValues);
    };
    const prepareFormOption = {
        onSaveMembershipPlan,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<MembershipPlanForm{...prepareFormOption}/>}/>
};

export default connect(null, {addMembershipPlan})(CreateMembershipPlan);
