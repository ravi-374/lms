import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MemberForm from './MemberForm';
import prepareFormData from '../../shared/prepareUserFormData';
import Modal from '../../../shared/components/Modal';
import {addMember} from '../../store/actions/memberAction';

const CreateMember = (props) => {
    const { addMember, toggleModal } = props;

    const onSaveMember = (formValues) => {
        addMember(prepareFormData(formValues));
    };

    const prepareFormOption = {
        initialValues: { is_active: true, isCreate: true },
        onSaveMember,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<MemberForm{...prepareFormOption}/>}/>
};

CreateMember.propTypes = {
    addMember: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addMember })(CreateMember);
