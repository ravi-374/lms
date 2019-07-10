import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteRole} from '../../store/actions/roleAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteRole = (props) => {
    const onDeleteRole = () => {
        props.deleteRole(props.roleId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteRole} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteRole})(DeleteRole);
