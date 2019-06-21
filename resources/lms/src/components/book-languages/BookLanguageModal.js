import React from 'react';
import DeleteBookLanguage from './DeleteBookLanguage';
import CreateBookLanguage from './CreateBookLanguage';
import EditBookLanguage from './EditBookLanguage';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, bookLanguage,isToggle} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'book-language-modal',
            title: isEditMode ? 'Edit Book Language' : 'Add New Book Language',
            toggleModal,
        };
        if (isEditMode) {
            return <EditBookLanguage {...prepareModalOption} bookLanguage={bookLanguage}/>
        }
        return <CreateBookLanguage {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            bookLanguageId: bookLanguage.id,
            title: 'Delete Book Language',
            toggleModal,
            isToggle,
            content: `Are sure you wants to be delete ? ${bookLanguage.language_name}`,
        };
        return <DeleteBookLanguage {...prepareModalOption}/>
    }
};
