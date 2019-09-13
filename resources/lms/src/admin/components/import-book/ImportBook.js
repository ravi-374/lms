import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import ImportBookForm from './ImportBookForm';
import {fetchAuthors} from '../../store/actions/authorAction';
import {fetchGenres} from '../../store/actions/genreAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';
import {fetchPublishers} from '../../store/actions/publisherAction';
import {fetchTags} from '../../store/actions/tagAction';
import prepareFormData from './prepareFormData';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {prepareFullNames} from "../../../shared/sharedMethod";
import {prepareBookLanguage} from "../../shared/prepareArray";
import {clearImportBook} from "../../store/actions/importBookAction";
import {addBook} from "../../store/actions/bookAction";
import {prepareCreatableObject} from "../../shared/prepareArray";

const ImportBook = (props) => {
    const {
        authors, publishers, tags, bookLanguages, genres, isLoading, clearImportBook,
        history, addBook, fetchAuthors, fetchPublishers, fetchGenres, fetchBookLanguages, fetchTags
    } = props;
    useEffect(() => {
        clearImportBook();
        fetchAuthors();
        fetchPublishers();
        fetchGenres();
        fetchBookLanguages(true);
        fetchTags();
    }, []);

    const onImportBook = (formValues) => {
        addBook(prepareFormData(formValues), history);
    };
    const goBack = () => {
        history.goBack();
    };
    const prepareFormOption = {
        authors,
        publishers,
        tags,
        genres,
        bookLanguages,
        onImportBook,
        onCancel: goBack,
    };
    return (
        <div className="animated fadeIn">
            {isLoading ? <ProgressBar/> : null}
            <HeaderTitle title={'Import Book | LMS System'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="page-heading">Import Book</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ImportBookForm {...prepareFormOption}/>
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
        authors: prepareCreatableObject(prepareFullNames(authors)),
        publishers: prepareCreatableObject(publishers),
        tags: prepareCreatableObject(tags),
        bookLanguages: prepareCreatableObject(prepareBookLanguage(Object.values(bookLanguages))),
        genres: prepareCreatableObject(genres),
    }
};

export default connect(mapStateToProps, {
    addBook,
    fetchAuthors,
    fetchGenres,
    fetchTags,
    fetchBookLanguages,
    fetchPublishers,
    clearImportBook,
})(ImportBook);
