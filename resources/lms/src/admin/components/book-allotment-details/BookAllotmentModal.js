import React from 'react';
import EditBookAllotment from '../books-allotment/EditBookAllotment';

export default (props) => {
    const {bookHistory, books, members, isToggle, toggleModal} = props;
    if (isToggle) {
        const prepareModalOption = {
            toggleModal,
            className: 'books-allotment-modal',
            title: 'Edit Book Allotment',
            books, members
        };
        return <EditBookAllotment {...prepareModalOption} bookAllotment={bookHistory}/>
    }
    return null;
};
