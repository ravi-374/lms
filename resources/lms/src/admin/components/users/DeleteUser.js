import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteUser} from '../../store/actions/userAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteUser = (props) => {
    const onDeleteUser = () => {
        props.deleteUser(props.userId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteUser} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteUser})(DeleteUser);
