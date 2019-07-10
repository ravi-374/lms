import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import BookSeriesModal from './BookSeriesModal';
import BookSeries from './BookSeries';
import './BooksSeries.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchBooksSeries} from '../../store/actions/bookSeriesAction';

const BooksSeries = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookSeries, setBookSeries] = useState(null);
    const {booksSeries, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchBooksSeries();
    }, []);
    const cardModalProps = {bookSeries, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, bookSeries = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookSeries(bookSeries);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, booksSeries, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Books Series</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        Add Book Series
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {booksSeries.length > 0 ? <BookSeries {...cardBodyProps}/> :
                                <EmptyComponent title="No books series yet..."/>}
                            <BookSeriesModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {booksSeries, searchText, sortObject, isLoading} = state;
    let booksSeriesArray = Object.values(booksSeries);
    if (searchText) {
        booksSeriesArray = searchFilter(booksSeriesArray, searchText);
    }
    if (sortObject) {
        booksSeriesArray = sortFilter(booksSeriesArray, sortObject);
    }
    return {booksSeries: booksSeriesArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchBooksSeries, sortAction, toggleModal})(BooksSeries);
