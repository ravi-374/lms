import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/actions/bookAction';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import DeleteBook from './DeleteBook';
import Toasts from '../../../shared/toast/Toasts';
import Book from './Book';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';

const Books = (props) => {
    const [book, setBook] = useState(null);
    const {books, history, sortAction, sortObject, isLoading, toggleModal} = props;
    useEffect(() => {
        props.fetchBooks(props.history);
    }, []);
    const cardModalProps = {
        book,
        toggleModal,
    };
    const onOpenModal = (book = null) => {
        setBook(book);
        toggleModal();
    };
    const cardBodyProps = {
        books,
        history,
        sortAction,
        sortObject,
        onOpenModal
    };
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
                <h5 className="page-heading">Books</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Link to="/app/admin/books/new" size="md" className="btn btn-primary ml-2">New Book</Link>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {books.length > 0 ? <Book {...cardBodyProps}/> :
                                <EmptyComponent title="No books yet..."/>}
                            <DeleteBook {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );

};

const mapStateToProps = (state) => {
    const {books, searchText, sortObject, isLoading, filterObject} = state;
    let booksArray = Object.values(books);
    if (searchText) {
        booksArray = searchFilter(booksArray, searchText);
    }
    if (sortObject) {
        booksArray = sortFilter(booksArray, sortObject);
    }
    if (filterObject && filterObject.type && filterObject.type === 'book') {
        booksArray = booksArray.filter(book => book.status === filterObject.filterField);
    }
    return {
        books: booksArray, sortObject, isLoading,
    };
};

export default connect(mapStateToProps, {
    fetchBooks, sortAction, toggleModal
})(Books);
