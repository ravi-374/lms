import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {fetchBooksHistory} from '../../store/actions/bookHistoryAction';
import BookHistoryTable from "./BookHistoryTable";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {toggleModal} from '../../../store/action/modalAction';
import UnReserveBook from "./UnReserveBook";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const BookHistory = props => {
    const [history, setHistory] = useState(null);
    const { bookHistory, isLoading, toggleModal, totalRecord } = props;
    const cardModalProps = {
        history,
        toggleModal,
    };

    const onChangeFilter = (filter) => {
        props.fetchBooksHistory(filter);
    };

    const onOpenModal = (bookItem = null) => {
        setHistory(bookItem);
        toggleModal();
    };

    const cardBodyProps = {
        bookHistory,
        onOpenModal,
        onChangeFilter,
        totalRecord,
        isLoading
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title={'Book History | LMS System'}/>
                <h5 className="page-heading">Book History</h5>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <BookHistoryTable {...cardBodyProps}/>
                            <UnReserveBook {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    )
};
const mapStateToProps = (state) => {
    const { bookHistory, isLoading, totalRecord } = state;
    return {
        bookHistory,
        isLoading,
        totalRecord
    }
};
export default connect(mapStateToProps, { fetchBooksHistory, toggleModal })(BookHistory);
