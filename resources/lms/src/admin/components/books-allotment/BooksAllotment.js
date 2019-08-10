import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import {sortAction} from '../../../store/action/sortAction';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import BookAllotmentModal from './BookAllotmentModal';
import BookAllotment from './BookAllotment';
import './BooksAllotment.scss';
import Toasts from '../../../shared/toast/Toasts';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksAllotment} from '../../store/actions/bookAllotmentAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {dateFormatter, prepareFullNames} from '../../../shared/sharedMethod';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const BooksAllotment = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookAllotment, setBookAllotment] = useState(null);
    const { booksAllotment, members, books, sortAction, sortObject, toggleModal, history } = props;
    useEffect(() => {
        props.fetchBooksAllotment();
        props.fetchMembers();
        props.fetchBooks();
    }, []);
    const cardModalProps = { bookAllotment, members, books, isEditMode, isDeleteMode, toggleModal };
    const onOpenModal = (isEdit, booksAllotment = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookAllotment(booksAllotment);
        toggleModal();
    };
    const cardBodyProps = { members, sortAction, sortObject, booksAllotment, onOpenModal, history };
    if (props.isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title={'Books Allotments | LMS System'}/>
                <h5 className="page-heading">Books Allotment</h5>
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
const prepareBookAllotment = (booksAllotment) => {
    const booksAllotmentArray = [];
    booksAllotment.forEach(bookAllotment => {
        bookAllotment.book_name = bookAllotment.book_item.book.name;
        bookAllotment.book_code = bookAllotment.book_item.edition + ` (${bookAllotment.book_item.book_code})`;
        bookAllotment.readable_issue_date = bookAllotment.issued_on ? dateFormatter(bookAllotment.issued_on) : '';
        bookAllotment.readable_return_date = bookAllotment.return_date ? dateFormatter(bookAllotment.return_date) : '';
        booksAllotmentArray.push(bookAllotment);
    });
    return booksAllotmentArray;
};

const mapStateToProps = (state) => {
    const { booksAllotment, members, books, searchText, sortObject, isLoading } = state;
    let booksAllotmentArray = Object.values(booksAllotment);
    let membersArray = prepareFullNames(Object.values(members));
    if (searchText) {
        const filterKeys = ['book_name', 'book_code', 'member_name', 'readable_issue_date', 'readable_return_date', 'status_name'];
        booksAllotmentArray = searchFilter(booksAllotmentArray, searchText, filterKeys);
    }
    if (sortObject) {
        booksAllotmentArray = sortFilter(booksAllotmentArray, sortObject);
    }
    return {
        booksAllotment: prepareBookAllotment(booksAllotmentArray),
        members: membersArray,
        books: Object.values(books),
        sortObject,
        isLoading
    };
};

export default connect(mapStateToProps, {
    fetchBooksAllotment,
    fetchMembers,
    fetchBooks,
    sortAction,
    toggleModal
})(BooksAllotment);
