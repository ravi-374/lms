import React from 'react';
import DeleteUser from './DeleteUser';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

export default (props) => {
    const { isEditUser, toggleModal, isDeleteUser, isCreateUser, user } = props;
    if (!isDeleteUser) {
        const prepareModalOption = {
            className: 'user-modal',
            title: isEditUser ? 'Edit User' : 'New User',
            toggleModal,
        };
        if (isEditUser) {
            return <EditUser {...prepareModalOption} user={user}/>
        }
        if (isCreateUser) {
            return <CreateUser {...prepareModalOption}/>
        }
        return null;
    }
    if (isDeleteUser) {
        const prepareModalOption = {
            userId: user.id,
            title: 'Delete User',
            toggleModal,
            content: `Are you sure you want to delete "${user.first_name + ' ' + user.last_name}" ?`,
        };
        return <DeleteUser {...prepareModalOption}/>
    }
};
