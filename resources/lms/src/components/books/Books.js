import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/actions/bookAction';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import DeleteBook from './DeleteBook';
import Toasts from '../../shared/toast/Toasts';
import Book from './Book';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';

const Books = (props) => {
    const [book, setBook] = useState(null);
    const {books, authors, publishers, tags, bookLanguages, genres, history, sortAction, sortObject, isLoading, toggleModal} = props;
    useEffect(() => {
        props.fetchBooks(props.history);
        props.fetchAuthors();
        props.fetchPublishers();
        props.fetchGenres();
        props.fetchBookLanguages();
        props.fetchTags();
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
        authors,
        publishers,
        bookLanguages,
        genres,
        tags,
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
                <h5 className="pull-left text-dark">Books</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Link to="/app/books/new" size="md" className="btn btn-primary ml-2">New Book</Link>
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
    const {authors, publishers, bookLanguages, genres, tags} = state;
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
        authors: Object.values(authors),
        publishers: Object.values(publishers),
        bookLanguages: Object.values(bookLanguages),
        genres: Object.values(genres),
        tags: Object.values(tags)
    };
};

export default connect(mapStateToProps, {
    fetchBooks, fetchAuthors,
    fetchGenres,
    fetchBookLanguages,
    fetchPublishers,
    fetchTags,
    sortAction, toggleModal
})(Books);
