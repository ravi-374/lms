import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
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
import {prepareAuthor, prepareBookLanguage, preparePublisher} from './prepareArray';
import {setLoading} from '../../store/actions/progressBarAction';

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
        props.history.push('/app/admin/books');
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
    const {id, is_featured, isbn, name, price, quantity, url, description, image, items} = props.book;
    const changAbleFields = {
        id,
        is_featured,
        isbn,
        selectedGenres: props.book.genres,
        selectedAuthors: props.book.authors ? prepareAuthor(props.book.authors) : [],
        name,
        price,
        quantity,
        selectedTags: props.book.tags,
        url,
        description,
        image,
        items: items && items.length > 0 ? items : [{}]
    };
    if (!changAbleFields.selectedGenres || changAbleFields.selectedGenres && changAbleFields.selectedGenres.length === 0 || bookLanguages.length === 0) {
        props.setLoading(true);
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
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">Edit Book</h5>
                    <Button onClick={goBack}>Back</Button>
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
        fetchPublishers,
        setLoading,
    }
)(EditBook);
