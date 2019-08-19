import React from 'react';
import DeleteTag from './DeleteTag';
import CreateTag from './CreateTag';
import EditTag from './EditTag';

export default (props) => {
    const {isEditTag, toggleModal, isDeleteMode,isCreateTag, tag} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'tag-modal',
            title: isEditTag ? 'Edit Tag' : 'New Tag',
            toggleModal,
        };
        if (isEditTag) {
            return <EditTag {...prepareModalOption} tag={tag}/>
        }
        if(isCreateTag) {
            return <CreateTag {...prepareModalOption}/>
        }
        return null;
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
