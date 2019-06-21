import React from 'react';
import DeletePublisher from './DeletePublisher';
import CreatePublisher from './CreatePublisher';
import EditPublisher from './EditPublisher';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, publisher} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'publisher-modal',
            title: isEditMode ? 'Edit Publisher' : 'Add New Publisher',
            toggleModal,
        };
        if (isEditMode) {
            return <EditPublisher {...prepareModalOption} publisher={publisher}/>
        }
        return <CreatePublisher {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            publisherId: publisher.id,
            title: 'Delete Publisher',
            toggleModal,
            content: `Are sure you wants to be delete ? ${publisher.name}`,
        };
        return <DeletePublisher {...prepareModalOption}/>
    }
};
