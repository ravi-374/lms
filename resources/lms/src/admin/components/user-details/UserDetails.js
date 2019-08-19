import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import './UserDetails.scss';
import {fetchUser} from '../../store/actions/userAction';
import {fetchCountries} from "../../store/actions/countryAction";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import {Routes} from "../../../constants";

const UserDetail = props => {
    const { user, countries, history, isLoading } = props;
    useEffect(() => {
        props.fetchUser(+props.match.params.id);
        props.fetchCountries();
    }, []);
    if (!user || isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }

    const goBack = () => {
        history.push(Routes.USERS);
    };
    const imageUrl = user.image ? publicImagePathURL.USER_AVATAR_URL + user.image : publicImagePath.USER_AVATAR;
    const { address } = user;
    let fullAddress = '';
    if (address) {
        if (address.address_1) {
            fullAddress += address.address_1;
        }
        if (address.address_2) {
            fullAddress += ',  ' + address.address_2;
        }
        if (address.city) {
            fullAddress += ',  ' + address.city;
        }
        if (address.state) {
            fullAddress += ',  ' + address.state;
        }
        if (address.country_id) {
            const country = countries.find(country => country.id === +address.country_id);
            if (country) {
                fullAddress += ',  ' + country.name;
            }
        }
        if (address.zip) {
            fullAddress += '-' + address.zip;
        }
    }
    return (
        <div className="animated fadeIn">
            <HeaderTitle title={'User Details | LMS System'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">{user.first_name + ' ' + user.last_name}</h5>
                    <div className="d-flex">
                        <Button onClick={() => goBack()}>Back</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="user-detail-row no-gutters">
                                    <div className="user__image-holder-wrapper">
                                        <div className="user__image-holder">
                                            <img src={imageUrl} height="250"/>
                                        </div>
                                    </div>
                                    <div className="user-detail">
                                        <div className="user-detail__item-container">
                                            <div className="user-detail__item">
                                                <span className="user-detail__item-heading">Email</span>
                                                <span>{user.email}</span>
                                            </div>
                                            {fullAddress !== '' ?
                                                <div className="user-detail__item">
                                                    <span className="user-detail__item-heading">Address</span>
                                                    <span>{fullAddress}</span>
                                                </div> : null
                                            }
                                            {user.phone ?
                                                <div className="user-detail__item">
                                                    <span className="user-detail__item-heading">Phone</span>
                                                    <span>{user.phone}</span>
                                                </div> : null
                                            }
                                            <div className="user-detail__item">
                                                <span className="user-detail__item-heading">Role</span>
                                                <span>{user.roles.map(({ name }) => name).join('')}</span>
                                            </div>
                                            <div className="user-detail__item">
                                                <span className="user-detail__item-heading">Status</span>
                                                <span>{user.is_active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { users, countries, isLoading } = state;
    return {
        user: users[ownProp.match.params.id],
        countries,
        isLoading
    }
};

export default connect(mapStateToProps, {
    fetchUser,
    fetchCountries,
})(UserDetail);
