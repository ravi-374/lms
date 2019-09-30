import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookSearchForm from './BookSearchForm';
import BookSearchTable from './BookSearchTable';
import './BookSearch.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {getFormattedMessage, prepareFullNames} from '../../../shared/sharedMethod';
import {fetchBooks} from '../../store/actions/bookAction';
import {findBooks} from '../../store/actions/bookSearchAction';
import {fetchAuthors} from '../../store/actions/authorAction';

const BookSearch = (props) => {
    const { isLoading, books, searchBooks, authors, fetchBooks, findBooks, fetchAuthors } = props;
    const [isSearch, setSearch] = useState(false);

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
    }, []);

    if (isLoading && !isSearch) {
        return <><ProgressBar/><Toasts/></>;
    }
    const onSearchBook = (params) => {
        findBooks(params);
    };

    const prepareFormOption = { books, authors, onSearchBook, setSearch };

    return (
        <div className="animated fadeIn">
            <HeaderTitle title="Books"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">{getFormattedMessage('books.title')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs={12}><BookSearchForm {...prepareFormOption}/></Col>
                                    <Col xs={12} className="mt-3">
                                        {searchBooks.length > 0 && isSearch ?
                                            <BookSearchTable books={searchBooks}/> :
                                            searchBooks.length === 0 && isSearch && !isLoading ?
                                                <EmptyComponent isShort={true}
                                                                title={getFormattedMessage('books.empty-message')}/> : null
                                        }
                                    </Col>
                                    <ProgressBar/>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

BookSearch.propTypes = {
    books: PropTypes.array,
    authors: PropTypes.array,
    searchBooks: PropTypes.array,
    isLoading: PropTypes.bool,
    fetchBooks: PropTypes.func,
    fetchAuthors: PropTypes.func,
    findBooks: PropTypes.func
};

const mapStateToProps = (state) => {
    const { books, searchBooks, authors, isLoading } = state;
    return { books, searchBooks, authors: prepareFullNames(authors), isLoading }
};
export default connect(mapStateToProps, { fetchBooks, fetchAuthors, findBooks })(BookSearch);
