import React from 'react';
import {connect} from 'react-redux';
import BookItemForm from './BookItemForm';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import {bookFormatOptions} from '../../constants';

const EditBookItem = (props) => {
    const {bookLanguages, publishers, bookItems, bookItem, toggleModal, addBookItem, bookId} = props;
    const {id, book_code, edition, format, location, price, language_id, publisher_id} = bookItem;
    const saveBookItem = (formValues) => {
        const bookItemArray = [...bookItems];
        const index = bookItemArray.findIndex(bookItem => bookItem.id === id);
        bookItemArray.splice(index, 1, formValues);
        const book_code = formValues.book_code;
        if (book_code && book_code === bookItem.book_code) {
            delete formValues.book_code;
        }
        addBookItem(bookId, bookItemArray);
    };
    const changeAbleFields = {
        book_code, edition, format, location, price,
        selectedLanguage: bookLanguages.filter(language => language.id === language_id),
        selectedPublisher: publishers.filter(publisher => publisher.id === publisher_id),
        selectedFormat: bookFormatOptions.filter(bookFormat => bookFormat.id === format),
    };
    const prepareFormOption = {
        saveBookItem,
        onCancel: toggleModal,
        bookLanguages, publishers,
        initialValues: changeAbleFields
    };
    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

export default connect(null, {addBookItem})(EditBookItem);
