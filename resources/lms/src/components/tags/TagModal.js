import React from 'react';
import DeleteTag from './DeleteTag';
import CreateTag from './CreateTag';
import EditTag from './EditTag';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, tag} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'tag-modal',
            title: isEditMode ? 'Edit Tag' : 'New Tag',
            toggleModal,
        };
        if (isEditMode) {
            return <EditTag {...prepareModalOption} tag={tag}/>
        }
        return <CreateTag {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            tagId: tag.id,
            title: 'Delete Tag',
            toggleModal,
            content: `Are you sure you want to delete "${tag.name}" ?`,
        };
        return <DeleteTag {...prepareModalOption}/>
    }
};
