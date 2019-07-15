import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addMember} from '../../store/actions/memberAction';
import MemberForm from './MemberForm';
import prepareFormData  from './prepareFormData';

const CreateMember = (props) => {
    const onSaveMember = (formValues) => {
        props.addMember(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveMember,
        onCancel: props.toggleModal,
        membershipPlans:props.membershipPlans
    };
    return <Modal {...props} content={<MemberForm{...prepareFormOption}/>}/>
};

export default connect(null, {addMember})(CreateMember);
