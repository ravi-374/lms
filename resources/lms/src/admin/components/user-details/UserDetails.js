import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import UserDetailModal from './UserDetailModal';
import './UserDetails.scss';
import {fetchUser} from '../../store/actions/userAction';
import {fetchRoles} from "../../store/actions/roleAction";
import {toggleModal} from "../../../store/action/modalAction";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import {Routes} from "../../../constants";
import {prepareRoles} from "../../shared/sharedMethod";

const UserDetail = props => {
    const [isToggle, setIsToggle] = useState(true);
    const { user, roles, history, isLoading, toggleModal } = props;
    useEffect(() => {
        props.fetchUser(+props.match.params.id);
        props.fetchRoles();
    }, []);
    if (!user || isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };
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
        if (address.country) {
            fullAddress += ',  ' + address.country.name;
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
                    <h5 className="pull-left text-dark">User Details</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            Edit User Details
                        </Button>
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
                                                <span className="user-detail__item-heading">Name</span>
                                                <span>
                                                    {user.first_name + ' ' + user.last_name}
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
                                                <span>{user.roles.map(({ name }) => name).join('')}</span>
                                            </div>
                                            <div className="user-detail__item">
                                                <span className="user-detail__item-heading">Status</span>
                                                <span>{user.is_active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <UserDetailModal user={user} roles={roles} isEditMode={isToggle}
                                                 toggleModal={toggleModal}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { users, roles, isLoading } = state;
    return {
        user: users[ownProp.match.params.id],
        roles: prepareRoles(Object.values(roles)),
        isLoading
    }
};

export default connect(mapStateToProps, {
    fetchUser,
    fetchRoles,
    toggleModal
})(UserDetail);
