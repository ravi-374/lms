import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import RoleModal from './RoleModal';
import Role from './Role';
import './Roles.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchRoles} from '../../store/actions/roleAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const Roles = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [role, setRole] = useState(null);
    const {roles, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchRoles();
    }, []);
    const cardModalProps = {role, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, role = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setRole(role);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, roles, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Roles | LMS System'}/>
                <h5 className="page-heading">Roles</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Role
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {roles.length > 0 ? <Role {...cardBodyProps}/> :
                                <EmptyComponent title="No roles yet..."/>}
                            <RoleModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {roles, searchText, sortObject, isLoading} = state;
    let rolesArray = Object.values(roles);
    if (searchText) {
        const filterKeys = ['name', 'display_name'];
        rolesArray = searchFilter(rolesArray, searchText,filterKeys);
    }
    if (sortObject) {
        rolesArray = sortFilter(rolesArray, sortObject);
    }
    return {roles: rolesArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchRoles, sortAction, toggleModal})(Roles);
