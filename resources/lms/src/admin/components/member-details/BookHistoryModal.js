import React from 'react';
import DeleteBookAllotment from '../books-allotment/DeleteBookAllotment';
import EditBookAllotment from '../books-allotment/EditBookAllotment';
import EditMember from '../members/EditMember';

export default (props) => {
    const { bookHistory, isEditBookAllotment, isDeleteMode, isEditMember, toggleModal, member } = props;
    if (!isDeleteMode) {
        if (isEditBookAllotment) {
            const prepareModalOption = {
                toggleModal,
                className: 'books-allotment-modal',
                title: 'Edit Book Allotment', isMemberBookHistory: true
            };
            return <EditBookAllotment {...prepareModalOption} bookAllotment={bookHistory}/>
        }
        if (isEditMember) {
            const prepareModalOption = {
                toggleModal,
                className: 'member-modal',
                title: 'Edit Member',
            };
            return <EditMember {...prepareModalOption} member={member}/>
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
