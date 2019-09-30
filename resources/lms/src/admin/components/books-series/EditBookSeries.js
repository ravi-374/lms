import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import BookSeriesForm from './BookSeriesForm';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {editBookSeries, fetchBookSeries} from '../../store/actions/bookSeriesAction';
import {fetchBooks} from '../../store/actions/bookAction';

const EditBookSeries = (props) => {
    const { books, bookSeries, isLoading, history, editBookSeries, fetchBookSeries, fetchBooks } = props;

    useEffect(() => {
        fetchBookSeries(+props.match.params.id);
        fetchBooks();
    }, []);

    const onSaveBookSeries = (formValues) => {
        editBookSeries(bookSeries.id, formValues, history);
    };

    const goBack = () => {
        history.goBack();
    };

    if (isLoading || !bookSeries || !books || (books && books.length === 0) ||
        (bookSeries && !bookSeries.series_items) ||
        (bookSeries && bookSeries.series_items && bookSeries.series_items.length === 0)) {
        return <><ProgressBar/><Toasts/></>;
    }
    const { title, series_items } = bookSeries;
    const changAbleFields = { title, series_items: prepareBookSeriesItem(series_items, books) };
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
        initialValues: changAbleFields,
        books
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title={'Edit Books Series'}/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark"> {getFormattedMessage('books-series.modal.edit.title')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <BookSeriesForm {...prepareFormOption}/>
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

EditBookSeries.propTypes = {
    bookSeries: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    books: PropTypes.array,
    editBookSeries: PropTypes.func,
    fetchBookSeries: PropTypes.func,
    fetchBooks: PropTypes.func,
};


const prepareBookSeriesItem = (seriesItems, books) => {
    let seriesItemArray = [];
    seriesItems.forEach(seriesItem => {
        const book = books.find(book => book.id === seriesItem.book_id);
        if (book) {
            seriesItemArray.push({ sequence: seriesItem.sequence, book_id: { id: book.id, name: book.name } });
        }
    });
    return seriesItemArray;
};

const mapStateToProps = (state, ownProp) => {
    const { isLoading, booksSeries, books, } = state;
    return {
        isLoading,
        bookSeries: booksSeries[ownProp.match.params.id], books,
    }
};

export default connect(mapStateToProps, { editBookSeries, fetchBookSeries, fetchBooks })(EditBookSeries);
