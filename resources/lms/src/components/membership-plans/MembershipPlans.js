import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import MembershipPlanModal from './MembershipPlanModal';
import MembershipPlan from './MembershipPlan';
import './MembershipPlans.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchMembershipPlans} from '../../store/actions/membershipPlanAction';

const MembershipPlans = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const {membershipPlans, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchMembershipPlans();
    }, []);
    const cardModalProps = {membershipPlan, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, membershipPlan = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setMembershipPlan(membershipPlan);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, membershipPlans, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Membership Plans</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Membership Plan
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {membershipPlans.length > 0 ? <MembershipPlan {...cardBodyProps}/> :
                                <EmptyComponent title="No membership-plans yet..."/>}
                            <MembershipPlanModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {membershipPlans, searchText, sortObject, isLoading} = state;
    let membershipPlansArray = Object.values(membershipPlans);
    if (searchText) {
        membershipPlansArray = searchFilter(membershipPlansArray, searchText);
    }
    if (sortObject) {
        membershipPlansArray = sortFilter(membershipPlansArray, sortObject);
    }
    return {membershipPlans: membershipPlansArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchMembershipPlans, sortAction, toggleModal})(MembershipPlans);
