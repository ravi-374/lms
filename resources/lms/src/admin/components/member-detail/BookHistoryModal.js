import React from 'react';
import DeleteBookAllotment from '../books-allotment/DeleteBookAllotment';
import EditBookAllotment from '../books-allotment/EditBookAllotment';
import EditMember from '../members/EditMember';

export default (props) => {
    const {bookHistory, books, members, isEditMode, isDeleteMode, isEditMember, toggleModal, member, membershipPlans} = props;
    if (!isDeleteMode) {
        if (isEditMode) {
            const prepareModalOption = {
                toggleModal,
                className: 'books-allotment-modal',
                title: 'Edit Book Allotment',
                books, members, isMemberBookHistory: true
            };
            return <EditBookAllotment {...prepareModalOption} bookAllotment={bookHistory}/>
        }
        if (isEditMember) {
            const prepareModalOption = {
                toggleModal,
                className: 'member-modal',
                title: 'Edit Member',
            };
            return <EditMember {...prepareModalOption} member={member} membershipPlans={membershipPlans}/>
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
