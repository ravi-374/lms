import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './MemberProfile.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import MemberProfileForm from './MemberProfileForm';
import {fetchMember, editMember} from '../../store/actions/memberAction';
import {fetchMembershipPlans} from '../../store/actions/membershipPlanAction';
import {fetchCountries} from '../../store/actions/countryAction';
import prepareFormData from './prepareFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const MemberProfile = props => {
    const {isLoading, countries, member, membershipPlans, history} = props;
    useEffect(() => {
        props.fetchMember();
        props.fetchMembershipPlans();
        props.fetchCountries();
    }, []);
    const onSaveMemberProfile = (formValues) => {
        props.editMember(prepareFormData(formValues), history);
    };
    const {id, is_active, first_name, last_name, email, password, membership_plan_id, phone, address, image} = member;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        membership_plan_id,
        image,
        selectedMemberShipPlan: membershipPlans.filter(memberPlan => memberPlan.id === +membership_plan_id),
        phone
    };
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
        initialValues: changeAbleFields,
        membershipPlans,
        countries,
        history,
        onSaveMemberProfile
    };

    if (!member || isLoading || !member.id || address && address.country_id && changeAbleFields.selectedCountry.length === 0) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    return (
        <div className="animated fadeIn">
            <HeaderTitle title={'Profile | LMS System'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">Profile</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row>
                                    <MemberProfileForm {...prepareFormOption}/>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {member, membershipPlans, countries} = state;
    return {member, membershipPlans, countries}
};
export default connect(mapStateToProps, {fetchMember, fetchMembershipPlans, fetchCountries, editMember})(MemberProfile);
