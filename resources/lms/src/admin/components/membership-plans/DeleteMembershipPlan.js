import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {deleteMembershipPlan} from '../../store/actions/membershipPlanAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteMembershipPlan = (props) => {
    const onDeleteMembershipPlan = () => {
        props.deleteMembershipPlan(props.membershipPlanId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteMembershipPlan} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteMembershipPlan})(DeleteMembershipPlan);
