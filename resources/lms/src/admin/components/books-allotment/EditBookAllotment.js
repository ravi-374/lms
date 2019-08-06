import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editBookAllotment} from '../../store/actions/bookAllotmentAction';
import {editMemberBookHistory} from '../../store/actions/memberBookHistoryAction';
import BookAllotmentForm from './BookAllotmentForm';
import {fetchBook} from '../../store/actions/bookAction';
import {bookStatusOptions} from '../../constants';
import moment from 'moment';

const EditBookAllotment = (props) => {
    const {toggleModal, className, title, books, selectedBook, bookAllotment, onSelectBook, bookId, members, bookItems, selectedBookItem, isMemberBookHistory} = props;
    const modalOption = {toggleModal, className, title};
    const formOption = {books, onSelectBook, bookId, members};
    const {note, reserve_date, issued_on, return_date} = bookAllotment;
    const changeAbleFields = {
        selectedBook,
        book: bookAllotment.book_item.book,
        note,
        reserve_date: reserve_date ? moment(reserve_date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        issued_on: issued_on ? moment(issued_on, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        return_date: return_date ? moment(return_date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        book_item: selectedBookItem,
        bookItems,
        member: members.find(member => member.id === +bookAllotment.member_id),
        status: bookStatusOptions.find(circular => circular.id === +bookAllotment.status)
    };
    useEffect(() => {
        props.fetchBook(bookAllotment.book_item.book.id, false);
    }, []);
    const onSaveBookAllotment = (formValues) => {
        if (!isMemberBookHistory) {
            props.editBookAllotment(formValues);
        } else {
            props.editMemberBookHistory(formValues);
        }
    };
    if (changeAbleFields.bookItems.length === 0) {
        return null;
    }
    const prepareFormOption = {
        onSaveBookAllotment,
        onCancel: toggleModal,
        initialValues: changeAbleFields
    };
    return <Modal {...modalOption} content={<BookAllotmentForm {...prepareFormOption} {...formOption} />}/>
};
const mapStateToProps = (state, ownProps) => {
    const filterArray = ownProps.books.filter(book => book.id === +ownProps.bookAllotment.book_item.book.id);
    return {
        selectedBook: filterArray,
        selectedBookItem: prepareBookItem(filterArray, ownProps.bookAllotment),
        bookItems: prepareBookItems(filterArray),
    }
};
const prepareBookItem = (books, bookAllotment = null) => {
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return [];
    }
    const bookItem = books[0].items.find(book => book.id === +bookAllotment.book_item_id);
    if (bookItem) {
        return {id: +bookItem.id, name: bookItem.edition + ` (${bookItem.book_code})`};
    }
};
const prepareBookItems = (books) => {
    let bookArray = [];
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return bookArray;
    }
    books[0].items.forEach(book => {
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_code})`});
    });
    return bookArray;
};
export default connect(mapStateToProps, {editBookAllotment, editMemberBookHistory, fetchBook})(EditBookAllotment);
