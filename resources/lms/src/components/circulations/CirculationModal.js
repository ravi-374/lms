import React from 'react';
import DeleteCirculation from './DeleteCirculation';
import CreateCirculation from './CreateCirculation';
import EditCirculation from './EditCirculation';

export default (props) => {
    const {circulation, books, members, isEditMode, isDeleteMode, toggleModal} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            toggleModal,
            className: 'circulation-modal',
            title: isEditMode ? 'Edit Circulation' : 'Add New Circulation',
            books, members
        };
        if (isEditMode) {
            return <EditCirculation {...prepareModalOption} circulation={circulation}/>
        }
        return <CreateCirculation {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            circulationId: circulation.id,
            title: 'Delete Circulation',
            toggleModal,
            content: `Are you sure you want to delete ${circulation.name} ?`,
        };
        return <DeleteCirculation {...prepareModalOption}/>
    }
};
