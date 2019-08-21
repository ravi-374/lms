import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editUser} from '../../store/actions/userAction';
import UserForm from './UserForm';
import prepareFormData from './prepareFormData';
import {fetchCountries} from "../../store/actions/countryAction";
import {fetchRoles} from "../../store/actions/roleAction";
import {prepareRoles} from "../../shared/sharedMethod";

const EditUser = (props) => {
    const { countries } = props;
    useEffect(() => {
        props.fetchCountries();
        props.fetchRoles();
    }, []);
    const onSaveUser = (formValues) => {
        props.editUser(props.user.id, prepareFormData(formValues));
    };
    const { id, is_active, first_name, last_name, email, phone, roles, address, image } = props.user;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        phone,
        image,
        role: { id: roles[0].id, name: roles[0].display_name },
    };
    if (address) {
        const { address_1, address_2, country, city, state, zip } = address;
        changeAbleFields.address_1 = address_1 ? address_1 : '';
        changeAbleFields.address_2 = address_2 ? address_2 : '';
        changeAbleFields.country = country ? country : null;
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
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

const mapStateToProps = (state) => {
    const { roles, countries } = state;
    return { roles: prepareRoles(Object.values(roles)), countries }
};
export default connect(mapStateToProps, { editUser, fetchCountries, fetchRoles })(EditUser);
