import React from 'react';
import DeleteBookAllotment from '../books-allotment/DeleteBookAllotment';
import EditBookAllotment from '../books-allotment/EditBookAllotment';

export default (props) => {
    const {bookHistory, books, members, isEditMode, isDeleteMode, toggleModal} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            toggleModal,
            className: 'books-allotment-modal',
            title: 'Edit Book History',
            books, members, isMemberBookHistory: true
        };
        if (isEditMode) {
            return <EditBookAllotment {...prepareModalOption} bookAllotment={bookHistory}/>
        }
        return null;
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            bookAllotmentId: bookHistory.id,
            title: 'Delete Book Allotment',
            toggleModal,
            content: `Are you sure you want to delete "${bookHistory.name}" ?`,
        };
        return <DeleteBookAllotment {...prepareModalOption}/>
    }
};
