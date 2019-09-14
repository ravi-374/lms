import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import './MemberDetails.scss';
import {fetchMember} from '../../store/actions/memberAction';
import {toggleModal} from '../../../store/action/modalAction';
import MemberBookHistory from './MemberBookHistory';
import BookHistoryModal from './BookHistoryModal';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {publicImagePathURL, publicImagePath} from "../../../appConstant";
import {getAvatarName, prepareFullAddress} from "../../../shared/sharedMethod";

const MemberDetail = props => {
    const [isEditBookAllotment, setIsEditBookAllotment] = useState(false);
    const [isEditMember, setIsEditMember] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookHistory, setBookHistory] = useState(null);
    const { member, toggleModal, history, appName, appLogo } = props;
    useEffect(() => {
        props.fetchMember(+props.match.params.id);
    }, []);
    if (!member) {
        return null;
    }
    const onOpenModal = (isEdit, bookHistory = null, isDelete = false) => {
        setIsEditMember(!isEdit);
        setIsEditBookAllotment(isEdit);
        setDeleteMode(isDelete);
        setBookHistory(bookHistory);
        toggleModal();
    };
    const goBack = () => {
        history.goBack();
    };
    const cardBodyProps = {
        onOpenModal,
        history,
        memberId: member.id
    };
    const cardModalProps = {
        bookHistory,
        isEditBookAllotment,
        isDeleteMode,
        isEditMember,
        toggleModal,
        member
    };
    const imageUrl = member.image ? publicImagePathURL.MEMBER_AVATAR_URL + member.image : null;
    const { address } = member;
    const fullAddress = prepareFullAddress(address);
    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle appLogo={appLogo} title={`Member Details | ${appName}`}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">{member.first_name + ' ' + member.last_name}</h5>
                    <div className="d-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal(false)}>
                            Edit Member Details
                        </Button>
                        <Button onClick={() => goBack()}>Back</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row className="member-detail-row no-gutters">
                                    <div className="member-detail__image-holder-wrapper">
                                        <div className="member-detail__image-holder">
                                            {imageUrl ? <img src={imageUrl} height="250"/> :
                                                <div className="member-detail__avatar">
                                                    <span className="member-detail__avatar-text">
                                                    {getAvatarName(member.first_name + ' ' + member.last_name)}
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="member-detail">
                                        <div className="member-detail__item-container">
                                            <div className="member-detail__item">
                                                <span className="member-detail__item-heading">Email</span>
                                                <span>{member.email}</span>
                                            </div>
                                            {fullAddress !== '' ?
                                                <div className="member-detail__item">
                                                    <span className="member-detail__item-heading">Address</span>
                                                    <span>{fullAddress}</span>
                                                </div> : null
                                            }
                                            {member.phone ?
                                                <div className="member-detail__item">
                                                    <span className="member-detail__item-heading">Phone</span>
                                                    <span>{member.phone}</span>
                                                </div> : null
                                            }
                                            <div className="member-detail__item">
                                                <span className="member-detail__item-heading">Membership Plan</span>
                                                <span>{member.membership_plan.name}</span>
                                            </div>
                                            <div className="member-detail__item">
                                                <span className="member-detail__item-heading">Status</span>
                                                <span>{member.is_active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="mt-5">
                                    <h5 className="mb-3">Book History</h5>
                                    <MemberBookHistory {...cardBodyProps}/>
                                </div>
                                <BookHistoryModal {...cardModalProps}/>
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { members } = state;
    return {
        member: members.find(member => member.id === +ownProp.match.params.id),
    }
};

export default connect(mapStateToProps, { fetchMember, toggleModal })(MemberDetail);
