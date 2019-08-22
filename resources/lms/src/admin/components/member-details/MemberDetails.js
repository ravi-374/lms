import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import './MemberDetails.scss';
import {fetchMember} from '../../store/actions/memberAction';
import {fetchMemberBooksHistory} from '../../store/actions/memberBookHistoryAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {toggleModal} from '../../../store/action/modalAction';
import MemberBookHistory from './MemberBookAllotment';
import BookHistoryModal from './BookHistoryModal';
import {sortAction} from '../../../store/action/sortAction';
import sortFilter from '../../../shared/sortFilter';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {prepareFullNames} from "../../../shared/sharedMethod";
import {publicImagePathURL, publicImagePath} from "../../../appConstant";

const MemberDetail = props => {
    const [isEditBookAllotment, setIsEditBookAllotment] = useState(false);
    const [isEditMember, setIsEditMember] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookHistory, setBookHistory] = useState(null);
    useEffect(() => {
        props.fetchMember(+props.match.params.id);
        props.fetchMemberBooksHistory(+props.match.params.id);
        props.fetchBooks();
        props.fetchMembers();
    }, []);
    const { member, memberBookHistory, books, toggleModal, history, sortObject, sortAction, members, isLoading } = props;
    if (!member || !members || isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
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
    const cardBodyProps = { books, members, sortAction, sortObject, memberBookHistory, onOpenModal, history };
    const cardModalProps = {
        bookHistory,
        books,
        members,
        isEditBookAllotment,
        isDeleteMode,
        isEditMember,
        toggleModal,
        member
    };
    const imageUrl = member.image ? publicImagePathURL.MEMBER_AVATAR_URL + member.image : publicImagePath.USER_AVATAR;
    const { address } = member;
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
            <HeaderTitle title={'Member Details | LMS System'}/>
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
                                    <div className="member__image-holder-wrapper">
                                        <div className="member__image-holder">
                                            <img src={imageUrl} height="250"/>
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
                                    {memberBookHistory.length > 0 ?
                                        <MemberBookHistory {...cardBodyProps}/> : null
                                    }
                                </div>
                                <BookHistoryModal {...cardModalProps}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state, ownProp) => {
    const { members, memberBookHistory, books, sortObject, isLoading } = state;
    let bookHistoryArray = Object.values(memberBookHistory);
    if (sortObject) {
        bookHistoryArray = sortFilter(bookHistoryArray, sortObject);
    }
    return {
        member: members[ownProp.match.params.id],
        memberBookHistory: bookHistoryArray,
        books: Object.values(books),
        members: prepareFullNames(Object.values(members)),
        sortObject,
        isLoading
    }
};

export default connect(mapStateToProps, {
    fetchMember,
    fetchMemberBooksHistory,
    fetchBooks,
    fetchMembers,
    sortAction,
    toggleModal
})(MemberDetail);
