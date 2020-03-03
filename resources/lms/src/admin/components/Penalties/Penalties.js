import React from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getFormattedMessage, dateFormatter} from "../../../shared/sharedMethod";
import {fetchPenalties} from '../../store/actions/penaltyAction';
import {toggleModal} from '../../../store/action/modalAction';
import {icon} from "../../../constants";

const Penalties = (props) => {
    const { penalties, fetchPenalties, toggleModal, isLoading, totalRecord } = props;

    const onChange = (filter) => {
        fetchPenalties(filter, true);
    };

    const columns = [
        {
            name: getFormattedMessage('react-data-table.name.column'),
            selector: 'member_name',
            width: '330px',
            sortable: true,
            cell: row => <span>{row.member_name}</span>,
        },
        {
            name: getFormattedMessage('react-data-table.book-name.column'),
            selector: 'book_item_name',
            width: '330px',
            sortable: true,
            cell: row => <span>{row.book_item_name}</span>,
        },
        {
            name: getFormattedMessage('react-data-table.collected_by.column'),
            selector: 'collected_by_name',
            width: '230px',
            sortable: true,
            cell: row => <span>{row.collected_by_name}</span>,
        },
        {
            name: getFormattedMessage('react-data-table.amount.column'),
            selector: 'actual_penalty',
            width: '230px',
            sortable: true,
            cell: row => <span>{row.actual_penalty}</span>,
        },
        {
            name: getFormattedMessage('react-data-table.date.column'),
            selector: 'collected_at',
            width: '300px',
            sortable: true,
            cell: row => <span>{dateFormatter(row.collected_at)}</span>,
        }
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Penalties"/>
                <h5 className="page-heading">{getFormattedMessage('penalties.title')}</h5>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={penalties} columns={columns} loading={isLoading}
                                emptyStateMessageId="penalties.empty-state.title"
                                emptyNotFoundStateMessageId="penalties.not-found.empty-state.title" totalRows={totalRecord}
                                onChange={onChange} icon={(icon.RUPEE)}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Penalties.propTypes = {
    penalties: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchPenalties: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { penalties, isLoading, totalRecord } = state;
    return { penalties, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchPenalties, toggleModal })(Penalties);
