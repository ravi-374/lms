import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {deleteBook} from '../../store/actions/bookAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBook = (props) => {
    const content = `Are you sure you want to delete "${props.book ? props.book.name : ''}" ?`;
    const title = "Delete a book";
    const onDeleteBook = () => {
        props.deleteBook(props.book.id);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBook} onCancel={props.toggleModal}/>}
                  content={content} title={title}/>;

};

export default connect(null, {deleteBook})(DeleteBook);
