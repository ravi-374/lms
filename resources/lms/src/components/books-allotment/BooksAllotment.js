import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../shared/components/SearchField';
import searchFilter from '../../shared/searchFilter';
import sortFilter from '../../shared/sortFilter';
import {sortAction} from '../../store/actions/sortAction';
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import BookAllotmentModal from './BookAllotmentModal';
import BookAllotment from './BookAllotment';
import './BooksAllotment.scss';
import Toasts from '../../shared/toast/Toasts';
import EmptyComponent from '../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../store/actions/modalAction';
import {fetchBookAllotment} from '../../store/actions/bookAllotmentAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';

const BooksAllotment = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookAllotment, setBookAllotment] = useState(null);
    const {booksAllotment, books, members, sortAction, sortObject, toggleModal} = props;
    useEffect(() => {
        props.fetchBookAllotment();
        props.fetchBooks();
        props.fetchMembers();
    }, []);
    const cardModalProps = {bookAllotment, books, members, isEditMode, isDeleteMode, toggleModal};
    const onOpenModal = (isEdit, booksAllotment = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookAllotment(booksAllotment);
        toggleModal();
    };
    const cardBodyProps = {books, members, sortAction, sortObject, booksAllotment, onOpenModal};
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <h5 className="pull-left text-dark">Books Allotment</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Book Allotment
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            {booksAllotment.length > 0 ? <BookAllotment {...cardBodyProps}/> :
                                <EmptyComponent title="No books allotment yet..."/>}
                            <BookAllotmentModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const {books, booksAllotment, members, searchText, sortObject, isLoading} = state;
    let booksAllotmentArray = Object.values(booksAllotment);
    if (searchText) {
        booksAllotmentArray = searchFilter(booksAllotmentArray, searchText);
    }
    if (sortObject) {
        booksAllotmentArray = sortFilter(booksAllotmentArray, sortObject);
    }
    return {
        books: Object.values(books),
        booksAllotment: booksAllotmentArray,
        members: prepareMembers(Object.values(members)),
        sortObject,
        isLoading
    };
};

const prepareMembers = (members) => {
    let memberArray = [];
    members.forEach(member => {
        memberArray.push({id: member.id, name: member.first_name + ' ' + member.last_name});
    });
    return memberArray;
};

export default connect(mapStateToProps, {
    fetchBookAllotment,
    fetchBooks,
    fetchMembers,
    sortAction,
    toggleModal
})(BooksAllotment);
