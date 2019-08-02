import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {deleteBookItem} from '../../store/actions/bookItemAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookItem = (props) => {
    const onDeleteBookItem = () => {
        props.deleteBookItem(props.bookItemId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookItem} onCancel={props.toggleModal}/>}/>

};

export default connect(null, {deleteBookItem})(DeleteBookItem);
