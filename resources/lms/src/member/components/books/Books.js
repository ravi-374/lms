import React, {useEffect, useState, Fragment} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import {fetchBooks} from '../../store/actions/bookAction';
import {findBooks} from '../../store/actions/bookSearchAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import BookSearchForm from './BookSearchForm';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import Book from './Book';
import './Books.scss';
import {prepareFullNames} from '../../../shared/sharedMethod';

const Books = (props) => {
    const {isLoading, books, searchBooks, authors, fetchBooks, findBooks, fetchAuthors} = props;
    const [isSearch, setSearch] = useState(false);
    useEffect(() => {
        fetchBooks();
        fetchAuthors();
    }, []);
    if (isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const onSearchBook = (params) => {
        findBooks(params);
        setSearch(true);
    };
    const prepareFormOption = {books, authors, onSearchBook};
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">Books</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs={12}><BookSearchForm {...prepareFormOption}/></Col>
                                    <Col xs={12} className="mt-3">
                                        {searchBooks.length > 0 && isSearch ?
                                            <Book books={searchBooks}/> :
                                            searchBooks.length === 0 && isSearch ?
                                                <EmptyComponent isShort={true} title="No books found..."/> : null
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {books, searchBooks, authors} = state;
    return {books, searchBooks, authors: prepareFullNames(authors)}
};
export default connect(mapStateToProps, {fetchBooks, fetchAuthors, findBooks})(Books);
