import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import BookItemForm from './BookItemForm';

const CreateBookItem = (props) => {
    const {bookLanguages, publishers, bookItems, toggleModal, addBookItem, bookId} = props;
    const saveBookItem = (formValues) => {
        addBookItem(bookId, [...bookItems, formValues]);
    };
    const prepareFormOption = {
        saveBookItem,
        onCancel: toggleModal,
        bookLanguages, publishers
    };
    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

export default connect(null, {addBookItem})(CreateBookItem);
