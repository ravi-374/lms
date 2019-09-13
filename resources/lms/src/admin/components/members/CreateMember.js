import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addMember} from '../../store/actions/memberAction';
import {fetchCountries} from "../../store/actions/countryAction";
import {fetchMembershipPlans} from "../../store/actions/membershipPlanAction";
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';

const CreateMember = (props) => {
    const { countries, fetchCountries, fetchMembershipPlans, membershipPlans } = props;
    useEffect(() => {
        fetchMembershipPlans(false);
        fetchCountries();
    }, []);

    const onSaveMember = (formValues) => {
        props.addMember(prepareFormData(formValues));
    };
    const prepareFormOption = {
        onSaveMember,
        onCancel: props.toggleModal,
        membershipPlans,
        countries
    };
    return <Modal {...props} content={<MemberForm{...prepareFormOption}/>}/>
};

const mapStateToProps = (state) => {
    const { membershipPlans, countries } = state;
    return {
        membershipPlans: Object.values(membershipPlans), countries
    };
};

export default connect(mapStateToProps, { addMember, fetchCountries, fetchMembershipPlans })(CreateMember);
