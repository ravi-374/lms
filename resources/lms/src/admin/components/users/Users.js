import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import UserModal from './UserModal';
import User from './UserTable';
import './Users.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {activeDeactiveUser, fetchUsers} from '../../store/actions/userAction';
import {fetchRoles} from '../../store/actions/roleAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const Users = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isCreateMode, setCreateMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [user, setUser] = useState(null);
    const { users, toggleModal, history, isLoading, totalRecord } = props;
    const cardModalProps = { user, isDeleteMode, isEditMode, isCreateMode, toggleModal };

    const setActiveInactive = (id) => {
        if (id) {
            props.activeDeactiveUser(id);
        }
    };
    const fetchUsers = (filter) => {
        props.fetchUsers(filter, true);
    };

    const onChangeData = (filter) => {
        fetchUsers(filter);
    };

    const onOpenModal = (isEdit, user = null, isDelete = false) => {
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setUser(user);
        toggleModal();
    };

    const cardBodyProps = {
        users,
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
                <HeaderTitle title={'Users | LMS System'}/>
                <ProgressBar/>
                <h5 className="page-heading">Users</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New User
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <User {...cardBodyProps}/>
                            <UserModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { users, isLoading, totalRecord } = state;
    return { users, isLoading, totalRecord };
};
export default connect(mapStateToProps, { fetchUsers, activeDeactiveUser, fetchRoles, toggleModal })(Users);
