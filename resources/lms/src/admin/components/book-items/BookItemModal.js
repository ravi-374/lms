import React from 'react';
import DeleteBookItem from './DeleteBookItem';
import CreateBookItem from './CreateBookItem';
import EditBookItem from './EditBookItem';

export default (props) => {
    const {isEditMode, isCreateMode, toggleModal, isDeleteMode, bookItem, bookLanguages, publishers, bookItems, bookId} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'book-item__modal',
            title: isEditMode ? 'Edit Book Item' : 'New Book Item',
            toggleModal,
        };
        const formOptions = {bookLanguages, publishers, bookItems, bookId};
        if (isEditMode) {
            return <EditBookItem {...prepareModalOption} {...formOptions} bookItem={bookItem}/>
        }
        if (isCreateMode) {
            return <CreateBookItem {...prepareModalOption} {...formOptions}/>
        }
        return null;
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            bookItemId: bookItem.id,
            title: 'Delete Book Item',
            toggleModal,
            content: `Are you sure you want to delete "${bookItem.edition + '(' + bookItem.book_code + ')' }" ?`,
        };
        return <DeleteBookItem {...prepareModalOption}/>
    }
};
