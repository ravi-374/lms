import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import BookItemForm from './BookItemForm';
import Modal from '../../../shared/components/Modal';
import {addBookItem} from '../../store/actions/bookItemAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';

const CreateBookItem = (props) => {
    const { bookItems, toggleModal, addBookItem, bookId } = props;

    const prepareBookItems = (bookItems) => {
        return _.map(bookItems, o => _.omit(o, ['status_name']));
    };

    const onSaveBookItems = (formValues) => {
        addBookItem(bookId, [...prepareBookItems(bookItems), formValues]);
    };

    const prepareFormOption = {
        onSaveBookItems,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<BookItemForm{...prepareFormOption}/>}/>
};

CreateBookItem.propTypes = {
    bookItems: PropTypes.array,
    bookId: PropTypes.number,
    addBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookItem, fetchPublishers, fetchBookLanguages })(CreateBookItem);
