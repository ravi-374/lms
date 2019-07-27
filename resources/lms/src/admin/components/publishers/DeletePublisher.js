import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deletePublisher} from '../../store/actions/publisherAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeletePublisher = (props) => {
    const onDeletePublisher = () => {
        props.deletePublisher(props.publisherId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeletePublisher} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deletePublisher})(DeletePublisher);
