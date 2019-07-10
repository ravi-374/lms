import React from 'react';
import DeleteRole from './DeleteRole';
import CreateRole from './CreateRole';
import EditRole from './EditRole';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, role} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'role-modal',
            title: isEditMode ? 'Edit Role' : 'Add New Role',
            toggleModal,
        };
        if (isEditMode) {
            return <EditRole {...prepareModalOption} role={role}/>
        }
        return <CreateRole {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            roleId: role.id,
            title: 'Delete Role',
            toggleModal,
            content: `Are you sure you want to delete ${role.name} ?`,
        };
        return <DeleteRole {...prepareModalOption}/>
    }
};
