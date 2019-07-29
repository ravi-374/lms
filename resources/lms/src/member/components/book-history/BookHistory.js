import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {fetchBooksHistory} from '../../store/actions/bookHistoryAction';
import {sortAction} from '../../../store/action/sortAction';
import sortFilter from '../../../shared/sortFilter';
import BookHistoryTable from "./BookHistoryTable";
import Toasts from "../../../shared/toast/Toasts";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import SearchField from "../../../shared/components/SearchField";
import EmptyComponent from "../../../shared/empty-component/EmptyComponent";
import searchFilter from "../../../shared/searchFilter";
import {toggleModal} from '../../../store/action/modalAction';
import UnReserveBook from "./UnReserveBook";

const BookHistory = props => {
    const [history, setHistory] = useState(null);
    useEffect(() => {
        props.fetchBooksHistory();
    }, []);

    const { bookHistory, sortObject, sortAction, isLoading, toggleModal } = props;
    const cardModalProps = {
        history,
        toggleModal,
    };
    const onOpenModal = (bookItem = null) => {
        setHistory(bookItem);
        toggleModal();
    };
    const cardBodyProps = {
        bookHistory,
        sortAction,
        sortObject,
        onOpenModal
    };
    if (isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="page-heading">Book History</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {bookHistory.length > 0 ?
                                <BookHistoryTable {...cardBodyProps}/> :
                                <EmptyComponent title="No book history yet..."/>
                            }
                            <UnReserveBook {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    )
};
const mapStateToProps = (state) => {
    const { bookHistory, searchText, sortObject, isLoading } = state;
    let bookHistoryArray = Object.values(bookHistory);
    // searching
    if (searchText) {
        bookHistoryArray = searchFilter(bookHistoryArray, searchText);
    }
    // sorting
    if (sortObject) {
        bookHistoryArray = sortFilter(bookHistoryArray, sortObject);
    }
    return {
        bookHistory: bookHistoryArray,
        sortObject,
        isLoading
    }
};
export default connect(mapStateToProps, { fetchBooksHistory, sortAction, toggleModal })(BookHistory);
