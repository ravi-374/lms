import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteBookAllotment} from '../../store/actions/bookAllotmentAction';

const DeleteBookAllotment = (props) => {
    const { bookAllotmentId, deleteBookAllotment, toggleModal } = props;

    const onDeleteBookAllotment = () => {
        deleteBookAllotment(bookAllotmentId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookAllotment} onCancel={toggleModal}/>}/>
};

DeleteBookAllotment.propTypes = {
    bookAllotmentId: PropTypes.number,
    deleteBookAllotment: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookAllotment })(DeleteBookAllotment);
