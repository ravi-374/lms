import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';

const CreateUser = (props) => {
    const onSaveUser = (formValues) => {
        formValues.roles = [{id: 1}, {id: 2}];
        props.addUser(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveUser,
        onCancel: props.toggleModal,
        roles: props.roles
    };
    return <Modal {...props} content={<UserForm{...prepareFormOption}/>}/>
};

export default connect(null, {addUser})(CreateUser);
