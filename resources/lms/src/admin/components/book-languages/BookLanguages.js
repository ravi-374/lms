import React, {useState, useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import BookLanguageModal from './BookLanguageModal';
import BookLanguage from './BookLanguage';
import './BookLanguages.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBookLanguages} from '../../store/actions/bookLanguageAction';

const BookLanguages = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookLanguage, setBookLanguage] = useState(null);
    const {bookLanguages, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchBookLanguages();
    }, []);
    const cardModalProps = {bookLanguage, isDeleteMode, isEditMode, toggleModal};
    const onOpenModal = (isEdit, bookLanguage = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookLanguage(bookLanguage);
        toggleModal();
    };
    const cardBodyProps = {sortAction, sortObject, bookLanguages, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="page-heading">Book Languages</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Book Language
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {bookLanguages.length > 0 ? <BookLanguage {...cardBodyProps}/> :
                                <EmptyComponent title="No book languages yet..."/>}
                            <BookLanguageModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {bookLanguages, searchText, sortObject, isLoading} = state;
    let bookLanguagesArray = Object.values(bookLanguages);
    if (searchText) {
        bookLanguagesArray = searchFilter(bookLanguagesArray, searchText);
    }
    if (sortObject) {
        bookLanguagesArray = sortFilter(bookLanguagesArray, sortObject);
    }
    return {bookLanguages: bookLanguagesArray, sortObject, isLoading};
};

export default connect(mapStateToProps, {fetchBookLanguages, sortAction, toggleModal})(BookLanguages);
