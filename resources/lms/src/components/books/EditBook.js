import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import {fetchBook, editBook} from '../../store/actions/bookAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';
import Toasts from '../../shared/toast/Toasts';
import BookForm from './BookForm';
import prepareFormData from './prepareFormData';
import {prepareAuthor, prepareBookLanguage, getSelectedObjects, preparePublisher} from './prepareArray';

const EditBook = (props) => {
    const [bookId, setBookId] = useState(null);
    useEffect(() => {
        setBookId(props.match.params.id);
        props.fetchBook(+props.match.params.id);
        props.fetchAuthors();
        props.fetchPublishers();
        props.fetchGenres();
        props.fetchBookLanguages();
        props.fetchTags();
    }, []);
    const onSaveBook = (formValues) => {
        props.editBook(bookId, prepareFormData(formValues), props.history);
    };
    const goBack = () => {
        props.history.push('/app/books');
    };
    if (!props.book || props.isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const {books, authors, publishers, bookLanguages, genres, tags} = props;
    const {id, is_featured, isbn, author_id, publisher_id, name, language_id, price, quantity, url, description, image, items} = props.book;
    const changAbleFields = {
        id,
        is_featured,
        isbn,
        selectedGenres: props.book.genres,
        author_id,
        author: getSelectedObjects(author_id, authors),
        publisher_id,
        publisher: getSelectedObjects(publisher_id, publishers),
        name,
        language_id,
        bookLanguage: getSelectedObjects(language_id, bookLanguages),
        price,
        quantity,
        selectedTags: props.book.tags,
        url,
        description,
        image,
        items: items && items.length > 0 ? items : [{format: 1, is_available: 1}]
    };
    if (!changAbleFields.selectedGenres || !changAbleFields.selectedTags ||
        changAbleFields.author.length === 0 ||
        changAbleFields.publisher.length === 0 || changAbleFields.bookLanguage.length === 0) {
        return null;
    }
    const prepareFormOption = {
        onSaveBook,
        initialValues: changAbleFields,
        books, authors, publishers, tags, bookLanguages, genres,
        onCancel: goBack,
    };
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2">
                    <h5 className="pull-left text-dark">Edit Book</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <BookForm {...prepareFormOption}/>
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );

};

const mapStateToProps = (state, ownProp) => {
    const {isLoading, books, authors, publishers, tags, bookLanguages, genres} = state;
    return {
        isLoading,
        book: books[ownProp.match.params.id],
        authors: prepareAuthor(Object.values(authors)),
        publishers: preparePublisher(Object.values(publishers)),
        tags: Object.values(tags),
        bookLanguages: prepareBookLanguage(Object.values(bookLanguages)),
        genres: Object.values(genres)
    }
};

export default connect(
    mapStateToProps, {
        fetchBook, editBook,
        fetchAuthors,
        fetchGenres,
        fetchTags,
        fetchBookLanguages,
        fetchPublishers
    }
)(EditBook);
