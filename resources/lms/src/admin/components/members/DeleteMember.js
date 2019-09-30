import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteMember} from '../../store/actions/memberAction';

const DeleteMember = (props) => {
    const { memberId, deleteMember, toggleModal } = props;

    const onDeleteMember = () => {
        deleteMember(memberId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteMember} onCancel={toggleModal}/>}/>
};

DeleteMember.propTypes = {
    memberId: PropTypes.number,
    deleteMember: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteMember })(DeleteMember);
