import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';
import {fetchCountries} from "../../store/actions/countryAction";
import {fetchRoles} from "../../store/actions/roleAction";
import {prepareRoles} from "../../shared/sharedMethod";

const CreateUser = (props) => {
    const { countries, roles } = props;
    useEffect(() => {
    }, []);
    const onSaveUser = (formValues) => {
        props.addUser(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveUser,
        onCancel: props.toggleModal,
        roles: roles,
        countries: countries
    };
    return <Modal {...props} content={<UserForm{...prepareFormOption}/>}/>
};

const mapStateToProps = (state) => {
    const { roles, countries } = state;
    return { roles: prepareRoles(Object.values(roles)), countries }
};
export default connect(mapStateToProps, { addUser, fetchCountries, fetchRoles })(CreateUser);
