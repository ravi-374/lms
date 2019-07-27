import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';
import apiConfig from '../../../config/apiConfig';

const EditUser = (props) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        apiConfig.get('countries').then(response =>
            setCountries([...countries, ...response.data.data])
        ).catch(({response}) => {
        })
    }, []);
    const onSaveUser = (formValues) => {
        props.editUser(props.user.id, prepareFormData(formValues));
    };
    const {id,is_active, first_name, last_name, email, phone, roles, address, image} = props.user;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        phone,
        image,
        selectedRole: roles,
    };
    if (countries.length <= 1) {
        return null;
    }
    if (address) {
        const {address_1, address_2, country_id, city, state, zip} = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.selectedCountry = country_id ? countries.filter(country => country.id === +country_id) : [];
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    if (!address) {
        changeAbleFields.selectedCountry = [];
    }
    const prepareFormOption = {
        onSaveUser,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields,
        roles: props.roles,
        countries
    };
    return <Modal {...props} content={<UserForm {...prepareFormOption}/>}/>
};

export default connect(null, {editUser})(EditUser);
