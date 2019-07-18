import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteCirculation} from '../../store/actions/circulationAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteCirculation = (props) => {
    const onDeleteCirculation = () => {
        props.deleteCirculation(props.circulationId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteCirculation} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteCirculation})(DeleteCirculation);
