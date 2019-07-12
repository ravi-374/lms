import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';

const EditUser = (props) => {
    const onSaveUser = (formValues) => {
        props.editUser(props.user.id, prepareFormData(formValues));
    };
    const {is_active, first_name, last_name, email, phone, roles, address, image} = props.user;
    const changeAbleFields = {
        is_active,
        first_name,
        last_name,
        email,
        phone,
        image,
        selectedRole: roles
    };
    if (address) {
        const {address_1, address_2, country, city, state, zip} = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.country = country ? country : '';
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    const prepareFormOption = {
        onSaveUser,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields,
        roles: props.roles
    };
    return <Modal {...props} content={<UserForm {...prepareFormOption} roles={props.roles}/>}/>
};

export default connect(null, {editUser})(EditUser);
