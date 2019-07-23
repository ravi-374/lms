import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import UserModal from './UserModal';
import User from './User';
import './Users.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchUsers} from '../../store/actions/userAction';
import {fetchRoles} from '../../store/actions/roleAction';

const Users = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isCreateMode, setCreateMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [user, setUser] = useState(null);
    const {users, roles, sortAction, sortObject, toggleModal,history} = props;
    const setActiveInactive = (index) => {
        users[index].is_active = !users[index].is_active;
    };
    useEffect(() => {
        props.fetchUsers();
        props.fetchRoles();
    }, []);
    const cardModalProps = {user, roles, isDeleteMode, isEditMode, isCreateMode, toggleModal};
    const onOpenModal = (isEdit, user = null, isDelete = false) => {
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setUser(user);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, users, roles, setActiveInactive, onOpenModal,history};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Users</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New User
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {users.length > 0 ? <User {...cardBodyProps}/> :
                                <EmptyComponent title="No users yet..."/>}
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
    const {users, searchText, sortObject, isLoading} = state;
    let usersArray = Object.values(users);
    if (searchText) {
        usersArray = searchFilter(usersArray, searchText);
    }
    if (sortObject) {
        usersArray = sortFilter(usersArray, sortObject);
    }
    return {users: usersArray, roles: Object.values(state.roles), sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchUsers, fetchRoles, sortAction, toggleModal})(Users);
