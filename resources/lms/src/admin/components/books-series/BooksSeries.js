import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import DeleteBookSeries from './DeleteBookSeries';
import BookSeries from './BookSeries';
import './BooksSeries.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksSeries} from '../../store/actions/bookSeriesAction';
import {fetchBooks} from '../../store/actions/bookAction';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const BooksSeries = (props) => {
    const [bookSeries, setBookSeries] = useState(null);
    const {booksSeries, sortAction, sortObject, toggleModal,history} = props;
    useEffect(() => {
        props.fetchBooksSeries();
        props.fetchBooks();
    }, []);
    const cardModalProps = {bookSeries, toggleModal};
    const onOpenModal = (bookSeries = null) => {
        setBookSeries(bookSeries);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, booksSeries, onOpenModal,history};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Books Series | LMS System'}/>
                <h5 className="page-heading">Books Series</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Link to="/app/admin/books-series/new" size="md" className="btn btn-primary ml-2">New Book Series</Link>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {booksSeries.length > 0 ? <BookSeries {...cardBodyProps}/> :
                                <EmptyComponent title="No books series yet..."/>}
                            <DeleteBookSeries {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {booksSeries, books, searchText, sortObject, isLoading} = state;
    let booksSeriesArray = Object.values(booksSeries);
    if (searchText) {
        booksSeriesArray = searchFilter(booksSeriesArray, searchText);
    }
    if (sortObject) {
        booksSeriesArray = sortFilter(booksSeriesArray, sortObject);
    }
    return {booksSeries: booksSeriesArray, sortObject, isLoading, books: Object.values(books)};
};

export default connect(mapStateToProps, {fetchBooksSeries, fetchBooks, sortAction, toggleModal})(BooksSeries);
