import React from 'react';
import EditUser from '../users/EditUser';

export default (props) => {
    const { isEditMode, toggleModal, user } = props;
    const prepareModalOption = {
        className: 'user-modal',
        title: 'Edit User Details',
        toggleModal,
    };
    if (isEditMode) {
        return <EditUser {...prepareModalOption} user={user}/>
    }
    return null;
};
