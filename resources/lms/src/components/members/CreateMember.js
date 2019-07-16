import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addMember} from '../../store/actions/memberAction';
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';
import apiConfig from '../../config/apiConfig';

const CreateMember = (props) => {
    const [countries, setCountries] = useState([{id: 0, name: 'Select Country'}]);
    useEffect(() => {
        apiConfig.get('countries').then(response =>
            setCountries([...countries, ...response.data.data])
        ).catch(({response}) => {
        })
    }, []);
    if (countries.length <= 1) {
        return null;
    }
    const onSaveMember = (formValues) => {
        props.addMember(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveMember,
        onCancel: props.toggleModal,
        membershipPlans: props.membershipPlans,
        countries
    };
    return <Modal {...props} content={<MemberForm{...prepareFormOption}/>}/>
};

export default connect(null, {addMember})(CreateMember);
