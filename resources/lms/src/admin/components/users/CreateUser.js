import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';

const CreateUser = (props) => {
    const { addUser, toggleModal } = props;
    const onSaveUser = (formValues) => {
        addUser(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveUser,
        onCancel: toggleModal,
    };
    return <Modal {...props} content={<UserForm{...prepareFormOption}/>}/>
};

export default connect(null, { addUser })(CreateUser);
