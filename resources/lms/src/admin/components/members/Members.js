import React, {useEffect} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import MemberModal from './MemberModal';
import Member from './MemberTable';
import './Members.scss';
import {FilterOption} from "../../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {activeInactiveMember, fetchMembers} from '../../store/actions/memberAction';
import {fetchMembershipPlans} from "../../store/actions/membershipPlanAction";

const Members = (props) => {
    const {
        members, fetchMembers, toggleModal, history, isLoading, totalRecord,
        membershipPlans, activeInactiveMember, fetchMembershipPlans
    } = props;
    const [isCreate, isEdit, isDelete, member, onOpenModal] = openModal();
    const cardModalProps = { member, isCreate, isEdit, isDelete, toggleModal };
    const intl = useIntl();

    useEffect(() => {
        fetchMembershipPlans();
    }, []);

    const onChangeData = (filter) => {
        fetchMembers(filter, true);
    };

    const setActiveInactive = (id) => {
        if (id) activeInactiveMember(id);
    };

    const onClickModal = (isEdit, member = null, isDelete = false) => {
        onOpenModal(isEdit, member, isDelete);
        toggleModal();
    };

    const cardBodyProps = {
        members,
        setActiveInactive,
        onClickModal,
        history,
        isLoading,
        totalRecord,
        onChangeData,
        membershipPlans: [{
            id: 0,
            name: intl.formatMessage({ id: FilterOption.ALL }),
            defaultValue: ''
        }, ...membershipPlans]
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Members"/>
                <h5 className="page-heading">{getFormattedMessage('members.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('members.modal.add.title')}
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

Members.propTypes = {
    history: PropTypes.object,
    members: PropTypes.array,
    membershipPlans: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchMembers: PropTypes.func,
    activeInactiveMember: PropTypes.func,
    fetchMembershipPlans: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { members, isLoading, totalRecord, membershipPlans } = state;
    return {
        members, isLoading, totalRecord,
        membershipPlans: Object.values((membershipPlans))
    };
};

export default connect(mapStateToProps, {
    fetchMembers,
    activeInactiveMember,
    fetchMembershipPlans,
    toggleModal
})(Members);
