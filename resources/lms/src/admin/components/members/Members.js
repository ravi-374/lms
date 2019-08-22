import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import MemberModal from './MemberModal';
import Member from './Member';
import './Members.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {activDeactiveMember, fetchMembers} from '../../store/actions/memberAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const members = (props) => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [member, setMember] = useState(null);
    const { members, toggleModal, history, isLoading, totalRecord } = props;

    const setActiveInactive = (id) => {
        if (id)
            props.activDeactiveMember(id);
    };

    const fetchMembers = (filter) => {
        props.fetchMembers(filter, true);
    };
    const onChangeData = (filter) => {
        fetchMembers(filter);
    };
    const cardModalProps = { member, isEditMode, isDeleteMode, isCreateMode, toggleModal };
    const onOpenModal = (isEdit, member = null, isDelete = false) => {
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setMember(member);
        toggleModal();
    };
    const cardBodyProps = {
        members,
        setActiveInactive,
        onOpenModal,
        history,
        isLoading,
        totalRecord,
        onChangeData
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Members | LMS System'}/>
                <ProgressBar/>
                <h5 className="page-heading">Members</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Member
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <Member {...cardBodyProps}/>
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
    const { members, isLoading, totalRecord } = state;
    return {
        members, isLoading, totalRecord
    };
};

export default connect(mapStateToProps, {
    fetchMembers,
    activDeactiveMember,
    toggleModal
})(members);
