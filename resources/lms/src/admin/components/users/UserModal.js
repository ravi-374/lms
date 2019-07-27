import React from 'react';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, isCreateMode, user, roles} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'user-modal',
            title: isEditMode ? 'Edit User' : 'New User',
            toggleModal,
        };
        if (isEditMode) {
            return <EditUser {...prepareModalOption} user={user} roles={roles}/>
        }
        if (isCreateMode) {
            return <CreateUser {...prepareModalOption} roles={roles}/>
        }
        return null;
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            userId: user.id,
            title: 'Delete User',
            toggleModal,
            content: `Are you sure you want to delete "${user.name}" ?`,
        };
        return <DeleteUser {...prepareModalOption}/>
    }
};
