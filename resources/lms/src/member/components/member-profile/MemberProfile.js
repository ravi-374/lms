import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import './MemberProfile.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import MemberProfileForm from './MemberProfileForm';
import {editMember, fetchMember} from '../../store/actions/memberAction';
import {fetchCountries} from '../../store/actions/countryAction';
import prepareFormData from './prepareFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import PropTypes from 'prop-types';

const MemberProfile = props => {
    const { isLoading, countries, member, history } = props;
    useEffect(() => {
        props.fetchMember();
        props.fetchCountries();
    }, []);
    const onSaveMemberProfile = (formValues) => {
        props.editMember(prepareFormData(formValues), history);
    };
    const { id, is_active, first_name, last_name, email, password, phone, address, image } = member;
    const changeAbleFields = {
        id,
        is_active,
        first_name,
        last_name,
        email,
        password,
        image,
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
        initialValues: changeAbleFields,
        countries,
        history,
        onSaveMemberProfile
    };

    if (!member || isLoading || !member.id) {
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
    const { member, countries, isLoading } = state;
    return { member, countries, isLoading }
};

MemberProfile.prototype = {
    isLoading: PropTypes.bool,
    countries: PropTypes.array.isRequired,
    member: PropTypes.array.isRequired,
    history: PropTypes.array.isRequired,
    changeAbleFields: PropTypes.object.isRequired,
    prepareFormOption: PropTypes.object.isRequired,
    onSaveMemberProfile: PropTypes.func
};

export default connect(mapStateToProps, {
    fetchMember,
    fetchCountries,
    editMember
})(MemberProfile);
