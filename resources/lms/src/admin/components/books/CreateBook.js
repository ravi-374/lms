import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import BookForm from './BookForm';
import {addBook} from '../../store/actions/bookAction';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';
import prepareFormData from './prepareFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {prepareFullNames} from "../../../shared/sharedMethod";
import {prepareBookLanguage} from "../../shared/prepareArray";

const CreateBook = (props) => {
    useEffect(() => {
        props.fetchAuthors();
        props.fetchPublishers();
        props.fetchGenres();
        props.fetchBookLanguages(true);
        props.fetchTags();
    }, []);
    const onSaveBook = (formValues) => {
        props.addBook(prepareFormData(formValues), props.history);
    };
    const goBack = () => {
        props.history.goBack();
    };
    const { authors, publishers, tags, bookLanguages, genres, isLoading } = props;
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
            {isLoading ? <ProgressBar/> : null}
            <HeaderTitle title={'New Book | LMS System'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">New Book</h5>
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
    const { isLoading, authors, publishers, tags, bookLanguages, genres } = state;
    return {
        isLoading,
        authors: prepareFullNames(Object.values(authors)),
        publishers: publishers,
        tags,
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
