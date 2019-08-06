import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import MemberModal from './MemberModal';
import Member from './Member';
import './Members.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {fetchMembershipPlans} from '../../store/actions/membershipPlanAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const members = (props) => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [member, setMember] = useState(null);
    const {members, membershipPlans, sortAction, sortObject, toggleModal,history} = props;
    const setActiveInactive = (index) => {
        members[index].is_active = !members[index].is_active;
    };
    useEffect(() => {
        props.fetchMembers();
        props.fetchMembershipPlans();
    }, []);
    const cardModalProps = {member, membershipPlans, isEditMode, isDeleteMode, isCreateMode, toggleModal};
    const onOpenModal = (isEdit, member = null, isDelete = false) => {
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setMember(member);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, members, membershipPlans, setActiveInactive, onOpenModal,history};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Members | LMS System'}/>
                <h5 className="page-heading">Members</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Member
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {members.length > 0 ? <Member {...cardBodyProps}/> :
                                <EmptyComponent title="No members yet..."/>}
                            <MemberModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {members, membershipPlans, searchText, sortObject, isLoading} = state;
    let membersArray = Object.values(members);
    if (searchText) {
        membersArray = searchFilter(membersArray, searchText);
    }
    if (sortObject) {
        membersArray = sortFilter(membersArray, sortObject);
    }
    return {
        members: membersArray,
        membershipPlans: Object.values(membershipPlans), sortObject, isLoading
    };
};

export default connect(mapStateToProps, {fetchMembers, fetchMembershipPlans, sortAction, toggleModal})(members);
