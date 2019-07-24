import React, {useEffect,Fragment} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import Toasts from '../../shared/toast/Toasts';
import {editBookSeries, fetchBookSeries} from '../../store/actions/bookSeriesAction';
import BookSeriesForm from './BookSeriesForm';
import {fetchBooks} from '../../store/actions/bookAction';
import {setLoading} from '../../store/actions/progressBarAction';

const EditBookSeries = (props) => {
    useEffect(() => {
        props.fetchBookSeries(+props.match.params.id);
        props.fetchBooks();
    }, []);
    const onSaveBookSeries = (formValues) => {
        props.editBookSeries(props.bookSeries.id, formValues,props.history);
    };
    const goBack = () => {
        props.history.push('/app/admin/books-series');
    };
    const {books,isLoading} = props;
    const {title,series_items} = props.bookSeries;
    const changAbleFields = {title, series_items};
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
        initialValues: changAbleFields,
        books
    };
    if (isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">Edit Book</h5>
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

const mapStateToProps = (state, ownProp) => {
    const {isLoading, books, booksSeries} = state;
    return {
        isLoading,
        bookSeries: booksSeries[ownProp.match.params.id],
        books: Object.values(books),
    }
};
export default connect(mapStateToProps, {editBookSeries, fetchBookSeries, fetchBooks, setLoading})(EditBookSeries);
