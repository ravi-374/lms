import React from 'react';
import DeleteBookAllotment from './DeleteBookAllotment';
import CreateBookAllotment from './AddBookAllotment';
import EditBookAllotment from './EditBookAllotment';

export default (props) => {
    const { bookAllotment, isEditMode, isDeleteMode, toggleModal, isCreateMode, filterObject } = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            toggleModal,
            className: 'books-allotment-modal',
            title: isEditMode ? 'Edit Book Allotment' : 'New Book Allotment',
        };
        if (isEditMode) {
            return <EditBookAllotment {...prepareModalOption} bookAllotment={bookAllotment}
                                      filterObject={filterObject}/>
        }
        if (isCreateMode) {
            return <CreateBookAllotment {...prepareModalOption} filterObject={filterObject}/>
        }
        return null;
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            bookAllotmentId: bookAllotment.id,
            title: 'Delete Book Allotment',
            toggleModal,
            content: `Are you sure you want to delete "${bookAllotment.name}" ?`,
        };
        return <DeleteBookAllotment {...prepareModalOption}/>
    }
};
