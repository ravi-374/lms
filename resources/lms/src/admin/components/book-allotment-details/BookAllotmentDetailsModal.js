import React from 'react';
import PropTypes from 'prop-types';
import EditBookAllotment from '../books-allotment/EditBookAllotment';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const BookAllotmentDetailsModal = (props) => {
    const { bookHistory, isToggle, toggleModal } = props;
    if (isToggle) {
        const prepareModalOption = {
            toggleModal,
            className: 'book-history-detail__modal',
            title: getFormattedMessage('books-allotment.modal.edit.title'),
        };
        return <EditBookAllotment {...prepareModalOption} bookAllotment={bookHistory}/>
    }
    return null;
};

BookAllotmentDetailsModal.propTypes = {
    bookHistory: PropTypes.object,
    isToggle: PropTypes.bool,
    toggleModal: PropTypes.func,
};

export default BookAllotmentDetailsModal;
