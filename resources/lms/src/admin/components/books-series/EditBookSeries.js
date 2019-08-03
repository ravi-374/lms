import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import {editBookSeries, fetchBookSeries} from '../../store/actions/bookSeriesAction';
import BookSeriesForm from './BookSeriesForm';
import {fetchBooks} from '../../store/actions/bookAction';
import {setLoading} from '../../../store/action/progressBarAction';

const EditBookSeries = (props) => {
    const {books, bookSeries, isLoading} = props;
    useEffect(() => {
        props.fetchBookSeries(+props.match.params.id);
        props.fetchBooks();
    }, []);
    const onSaveBookSeries = (formValues) => {
        props.editBookSeries(props.bookSeries.id, formValues, props.history);
    };
    const goBack = () => {
        props.history.push('/app/admin/books-series');
    };
    if (isLoading || !bookSeries || !books || (books && books.length === 0) ||
        (bookSeries && !bookSeries.series_items) ||
        (bookSeries && bookSeries.series_items && bookSeries.series_items.length === 0)) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const {title, series_items} = bookSeries;
    const changAbleFields = {title, series_items: prepareBookSeriesItem(series_items, books)};
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
        initialValues: changAbleFields,
        books
    };
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">Edit Book Series</h5>
                    <Button onClick={goBack}>Back</Button>
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
const prepareBookSeriesItem = (seriesItems, books) => {
    let seriesItemArray = [];
    seriesItems.forEach(seriesItem => {
        const book = books.find(book => book.id === seriesItem.book_id);
        if (book) {
            seriesItemArray.push({sequence: seriesItem.sequence, book_id: {id: book.id, name: book.name}});
        }
    });
    return seriesItemArray;
};
const mapStateToProps = (state, ownProp) => {
    const {isLoading, books, booksSeries} = state;
    return {
        isLoading,
        bookSeries: booksSeries[ownProp.match.params.id],
        books: Object.values(books),
    }
};
export default connect(mapStateToProps, {editBookSeries, fetchBookSeries, fetchBooks, setLoading})(EditBookSeries);
