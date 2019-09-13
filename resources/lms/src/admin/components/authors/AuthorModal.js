import React from 'react';
import DeleteAuthor from './DeleteAuthor';
import CreateAuthor from './CreateAuthor';
import EditAuthor from './EditAuthor';

export default (props) => {
    const { author, isCreateAuthor, isEdiAuthor, isDeleteAuthor, toggleModal } = props;
    if (!isDeleteAuthor) {
        const prepareModalOption = {
            className: 'author-modal',
            title: isEdiAuthor ? 'Edit Author' : 'New Author',
            toggleModal,
        };
        if (isEdiAuthor) {
            return <EditAuthor {...prepareModalOption} author={author}/>
        }
        if (isCreateAuthor) {
            return <CreateAuthor {...prepareModalOption}/>
        }
        return null;
    }
    if (isDeleteAuthor) {
        const prepareModalOption = {
            authorId: author.id,
            title: 'Delete Author',
            toggleModal,
            content: `Are you sure you want to delete "${author.first_name + ' ' + author.last_name}" ?`,
        };
        return <DeleteAuthor {...prepareModalOption}/>
    }
};
