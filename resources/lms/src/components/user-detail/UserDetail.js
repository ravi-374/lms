import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import './UserDetail.scss';
import {fetchUser} from '../../store/actions/userAction';
import apiConfig from '../../config/apiConfig';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import Toasts from '../../shared/toast/Toasts';

const UserDetail = props => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        props.fetchUser(+props.match.params.id);
        apiConfig.get('countries').then(response =>
            setCountries([...countries, ...response.data.data])
        ).catch(({response}) => {
        })
    }, []);
    const {user, history, isLoading} = props;
    if (!user || isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const goBack = () => {
        history.push('/app/users');
    };
    const imageUrl = user.image ? 'uploads/users/' + user.image : 'images/user-avatar.png';
    const {address} = user;
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
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">User Details</h5>
                    <div className="d-flex">
                        <Button onClick={() => goBack()}>Back</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="user-detail-row no-gutters">
                                    <div className="image-holder-wrapper">
                                        <div className="image-holder">
                                            <img src={imageUrl} height="250" width="220"/>
                                        </div>
                                    </div>
                                    <div className="user-detail">
                                        <div className="user-detail__item-container">
                                            <div className="user-detail__item">
                                                <span className="user-detail__item-heading">Name</span>
                                                <span>
                                                    {user.first_name + ' ' + user.last_name ? user.last_name : ''}
                                                </span>
                                            </div>
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
                                                <span>{user.roles.map(({name}) => name).join('')}</span>
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
    const {users, isLoading} = state;
    return {
        user: users[ownProp.match.params.id],
        isLoading
    }
};

export default connect(mapStateToProps, {
    fetchUser,
})(UserDetail);
