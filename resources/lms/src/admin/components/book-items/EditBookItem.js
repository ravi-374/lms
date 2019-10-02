import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BookItemForm from './BookItemForm';
import {bookFormatOptions, bookItemStatusOptions} from '../../constants';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import {getFormattedOptions} from "../../../shared/sharedMethod";

const EditBookItem = (props) => {
    const {
        bookLanguages, publishers, bookItems, bookItem,
        toggleModal, addBookItem, bookId
    } = props;
    const { id, book_code, edition, format, location, price, language, publisher, status } = bookItem;
    const bookItemsStatusOptions = getFormattedOptions(bookItemStatusOptions);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);

    const changeAbleFields = {
        book_code, edition, location, price,
        language: { id: language.id, name: language.language_name },
        publisher,
        format: booksFormatOptions.find(bookFormat => bookFormat.id === format),
        status: bookItemsStatusOptions.find(bookItemStatus => bookItemStatus.id === +status)
    };

    const onSaveBookItems = (formValues) => {
        formValues.id = id;
        const bookItemArray = _.map(bookItems, o => _.omit(o, ['status_name']));
        const index = bookItemArray.findIndex(bookItem => bookItem.id === id);
        bookItemArray.splice(index, 1, formValues);
        const book_code = formValues.book_code;
        if (book_code && book_code === bookItem.book_code) {
            delete formValues.book_code;
        }
        addBookItem(bookId, bookItemArray, true);
    };

    const prepareFormOption = {
        onSaveBookItems,
        onCancel: toggleModal,
        bookLanguages, publishers,
        initialValues: changeAbleFields
    };
    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

EditBookItem.propTypes = {
    bookItem: PropTypes.object,
    bookItems: PropTypes.array,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    bookId: PropTypes.number,
    addBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookItem })(EditBookItem);
