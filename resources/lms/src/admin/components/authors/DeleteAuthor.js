import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteAuthor} from '../../store/actions/authorAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteAuthor = (props) => {
    const onDeleteAuthor = () => {
        props.deleteAuthor(props.authorId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteAuthor} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteAuthor})(DeleteAuthor);
