import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import './UserProfile.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import UserProfileForm from './UserProfileForm';
import {fetchUserProfile, editUserProfile} from '../../store/actions/userProfileAction';
import {fetchCountries} from '../../store/actions/countryAction';
import prepareFormData from './prepareFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const MemberProfile = props => {
    const { isLoading, countries, userProfile, roles, fetchUserProfile, fetchCountries, editUserProfile,history } = props;
    useEffect(() => {
        fetchUserProfile();
        fetchCountries();
    }, []);
    const onSaveProfile = (formValues) => {
        editUserProfile(prepareFormData(formValues));
    };
    if (!userProfile || isLoading || !userProfile.id) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const { id, is_active, first_name, last_name, email, password, phone, address, image } = userProfile;
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
        changeAbleFields.country = country ? country : {};
        changeAbleFields.city = city ? city : '';
        changeAbleFields.state = state ? state : '';
        changeAbleFields.zip = zip ? zip : '';
    }
    const prepareFormOption = {
        initialValues: changeAbleFields,
        roles,
        countries,
        onSaveProfile,
        history
    };
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
                                    <UserProfileForm {...prepareFormOption}/>
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
    const { userProfile, countries } = state;
    return { userProfile, countries }
};
export default connect(mapStateToProps, {
    fetchUserProfile,
    fetchCountries,
    editUserProfile
})(MemberProfile);
