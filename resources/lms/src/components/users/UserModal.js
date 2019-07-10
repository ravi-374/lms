import React from 'react';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, user,roles} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'user-modal',
            title: isEditMode ? 'Edit User' : 'Add New User',
            toggleModal,
        };
        if (isEditMode) {
            return <EditUser {...prepareModalOption} user={user} roles={roles}/>
        }
        return <CreateUser {...prepareModalOption} roles={roles}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            userId: user.id,
            title: 'Delete User',
            toggleModal,
            content: `Are sure you wants to be delete ? ${user.name}`,
        };
        return <DeleteUser {...prepareModalOption}/>
    }
};
