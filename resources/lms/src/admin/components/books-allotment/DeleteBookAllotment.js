import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteBookAllotment} from '../../store/actions/bookAllotmentAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookAllotment = (props) => {
    const onDeleteBookAllotment = () => {
        props.deleteBookAllotment(props.bookAllotmentId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookAllotment} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteBookAllotment})(DeleteBookAllotment);
