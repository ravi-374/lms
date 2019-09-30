import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MemberForm from './MemberForm';
import prepareFormData from '../../shared/prepareUserFormData';
import Modal from '../../../shared/components/Modal';
import {editMember} from '../../store/actions/memberAction';
import {prepareProfileData} from "../../../shared/sharedMethod";

const EditMember = (props) => {
    const { member, editMember, toggleModal } = props;

    const onSaveMember = (formValues) => {
        formValues.roles = [];
        editMember(member.id, prepareFormData(formValues));
    };

    const prepareFormOption = {
        onSaveMember,
        onCancel: toggleModal,
        initialValues: prepareProfileData(member),
    };

    return <Modal {...props} content={<MemberForm {...prepareFormOption} />}/>
};

EditMember.propTypes = {
    member: PropTypes.object,
    editMember: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editMember })(EditMember);
