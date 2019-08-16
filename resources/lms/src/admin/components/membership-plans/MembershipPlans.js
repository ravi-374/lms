import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import CustomSearchField from '../../../shared/components/CustomSearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import MembershipPlanModal from './MembershipPlanModal';
import MembershipPlan from './MembershipPlan';
import './MembershipPlans.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchMembershipPlans} from '../../store/actions/membershipPlanAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const MembershipPlans = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [membershipPlan, setMembershipPlan] = useState(null);
    const { membershipPlans, sortAction, sortObject, toggleModal } = props;
    useEffect(() => {
        props.fetchMembershipPlans(true);
    }, []);
    const cardModalProps = { membershipPlan, isDeleteMode, isEditMode, toggleModal };
    const onOpenModal = (isEdit, membershipPlan = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setMembershipPlan(membershipPlan);
        toggleModal();
    };
    const cardBodyProps = { sortAction, sortObject, membershipPlans, onOpenModal };
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Membership Plans | LMS System'}/>
                <h5 className="page-heading">Membership Plans</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Membership Plan
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end mb-2">
                                <CustomSearchField/>
                            </div>
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
    const { membershipPlans, searchText, sortObject, isLoading } = state;
    let membershipPlansArray = Object.values(membershipPlans);
    if (searchText) {
        const filterKeys = ['name', 'price', 'frequency_name'];
        membershipPlansArray = searchFilter(membershipPlansArray, searchText, filterKeys);
    }
    if (sortObject) {
        membershipPlansArray = sortFilter(membershipPlansArray, sortObject);
    }
    return { membershipPlans: membershipPlansArray, sortObject, isLoading };
};

export default connect(mapStateToProps, { fetchMembershipPlans, sortAction, toggleModal })(MembershipPlans);
