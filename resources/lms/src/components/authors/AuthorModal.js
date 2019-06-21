import React from 'react';
import DeleteAuthor from './DeleteAuthor';
import CreateAuthor from './CreateAuthor';
import EditAuthor from './EditAuthor';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, author} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'author-modal',
            title: isEditMode ? 'Edit Author' : 'Add New Author',
            toggleModal,
        };
        if (isEditMode) {
            return <EditAuthor {...prepareModalOption} author={author}/>
        }
        return <CreateAuthor {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            authorId: author.id,
            title: 'Delete Author',
            toggleModal,
            content: `Are sure you wants to be delete ? ${author.name}`,
        };
        return <DeleteAuthor {...prepareModalOption}/>
    }
};
