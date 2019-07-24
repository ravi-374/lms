import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import Toasts from '../../shared/toast/Toasts';
import {addBookSeries} from '../../store/actions/bookSeriesAction';
import {fetchBooks} from '../../store/actions/bookAction';
import BookSeriesForm from './BookSeriesForm';

const CreateBookSeries = (props) => {
    useEffect(() => {
        props.fetchBooks();
    }, []);
    const onSaveBookSeries = (formValues) => {
        props.addBookSeries(formValues, props.history);
    };
    const goBack = () => {
        props.history.push('/app/books-series');
    };
    const {isLoading, books} = props;
    if (isLoading) {
        return (
            <Fragment>
                <ProgressBar/>
                <Toasts/>
            </Fragment>
        )
    }
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
        books
    };
    return (
        <div className="animated fadeIn">
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">New Series Book</h5>
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
    )
};

const mapStateToProps = (state) => {
    const {isLoading, books} = state;
    return {
        isLoading,
        books: Object.values(books),
    }
};
export default connect(mapStateToProps, {addBookSeries, fetchBooks})(CreateBookSeries);
