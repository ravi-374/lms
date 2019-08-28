import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import BookItemForm from './BookItemForm';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';

const CreateBookItem = (props) => {
    const { bookItems, toggleModal, addBookItem, bookId } = props;
    const saveBookItem = (formValues) => {
        addBookItem(bookId, [...bookItems, formValues]);
    };
    const prepareFormOption = {
        saveBookItem,
        onCancel: toggleModal,
    };
    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

export default connect(null, { addBookItem, fetchPublishers, fetchBookLanguages })(CreateBookItem);
