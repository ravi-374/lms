import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';
import apiConfig from '../../../config/apiConfig';

const CreateUser = (props) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        apiConfig.get('countries').then(response =>
            setCountries([...countries, ...response.data.data])
        ).catch(({response}) => {
        })
    }, []);
    if (countries.length <= 1) {
        return null;
    }
    const onSaveUser = (formValues) => {
        formValues.roles = [{id: 1}, {id: 2}];
        props.addUser(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveUser,
        onCancel: props.toggleModal,
        roles: props.roles,
        countries: countries
    };
    return <Modal {...props} content={<UserForm{...prepareFormOption}/>}/>
};

export default connect(null, {addUser})(CreateUser);
