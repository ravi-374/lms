import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {fetchBooksHistory} from '../../store/actions/bookHistoryAction';
import {sortAction} from '../../store/actions/sortAction';
import sortFilter from '../../../shared/sortFilter';
import BookHistoryTable from "./BookHistoryTable";
import Toasts from "../../../admin/shared/toast/Toasts";
import ProgressBar from "../../../admin/shared/progress-bar/ProgressBar";
import SearchField from "../../../admin/shared/components/SearchField";
import EmptyComponent from "../../../shared/empty-component/EmptyComponent";
import searchFilter from "../../../shared/searchFilter";

const BookHistory = props => {
    useEffect(() => {
        props.fetchBooksHistory();
    }, []);

    const { bookHistory, sortObject, sortAction, isLoading } = props;
    const cardBodyProps = { bookHistory, sortAction, sortObject };

    if (isLoading) {
        return (
            <Fragment>
                <Toasts/>
                <ProgressBar/>
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
export default connect(mapStateToProps, { fetchBooksHistory, sortAction })(BookHistory);
