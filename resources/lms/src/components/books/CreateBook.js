import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import Toasts from '../../shared/toast/Toasts';
import BookForm from './BookForm';
import {addBook} from '../../store/actions/bookAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';
import {prepareAuthor, preparePublisher, prepareBookLanguage} from './prepareArray';
import prepareFormData from './prepareFormData';

const CreateBook = (props) => {
    useEffect(() => {
        props.fetchAuthors();
        props.fetchPublishers();
        props.fetchGenres();
        props.fetchBookLanguages();
        props.fetchTags();
    }, []);
    const onSaveBook = (formValues) => {
        props.addBook(prepareFormData(formValues), props.history);
    };
    const goBack = () => {
        props.history.push('/app/books');
    };
    const {authors, publishers, tags, bookLanguages, genres, isLoading} = props;
    if (isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const prepareFormOption = {
        authors,
        publishers,
        tags,
        genres,
        bookLanguages,
        onSaveBook,
        onCancel: goBack
    };
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2">
                    <h5 className="pull-left text-dark">Add Book</h5>
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
    )
};

const mapStateToProps = (state) => {
    const {isLoading, authors, publishers, tags, bookLanguages, genres} = state;
    return {
        isLoading,
        authors: prepareAuthor(Object.values(authors)),
        publishers: preparePublisher(Object.values(publishers)),
        tags: Object.values(tags),
        bookLanguages: prepareBookLanguage(Object.values(bookLanguages)),
        genres: Object.values(genres)
    }
};

export default connect(mapStateToProps, {
    addBook,
    fetchAuthors,
    fetchGenres,
    fetchTags,
    fetchBookLanguages,
    fetchPublishers
})(CreateBook);
