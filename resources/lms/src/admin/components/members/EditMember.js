import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editMember} from '../../store/actions/memberAction';
import {fetchCountries} from "../../store/actions/countryAction";
import {fetchMembershipPlans} from "../../store/actions/membershipPlanAction";
import MemberForm from './MemberForm';
import prepareFormData from './prepareFormData';

const EditMember = (props) => {
    const { countries, fetchCountries, fetchMembershipPlans, membershipPlans } = props;
    useEffect(() => {
        fetchMembershipPlans(false);
        fetchCountries();
    }, []);
    const onSaveMember = (formValues) => {
        formValues.roles = [];
        props.editMember(props.member.id, prepareFormData(formValues));
    };
    const { id, is_active, first_name, last_name, email, password, membership_plan, phone, address, image } = props.member;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
        membership_plan,
        phone
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
        onSaveMember,
        onCancel: props.toggleModal,
        initialValues: changeAbleFields,
        membershipPlans,
        countries
    };
    return <Modal {...props} content={<MemberForm {...prepareFormOption} />}/>
};

const mapStateToProps = (state) => {
    const { membershipPlans, countries } = state;
    return {
        membershipPlans: Object.values(membershipPlans), countries
    };
};

export default connect(mapStateToProps, { editMember, fetchMembershipPlans, fetchCountries })(EditMember);
