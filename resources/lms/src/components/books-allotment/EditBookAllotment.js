import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editBookAllotment} from '../../store/actions/bookAllotmentAction';
import BookAllotmentForm from './BookAllotmentForm';
import {fetchBook} from '../../store/actions/bookAction';
import {bookAllotmentStatusOptions} from '../../constants';

const EditBookAllotment = (props) => {
    const {toggleModal, className, title, books, selectedBook, bookAllotment, onSelectBook, bookId, members, bookItems, selectedBookItem} = props;
    const modalOption = {toggleModal, className, title};
    const formOption = {books, onSelectBook, bookId, members};
    const {book_item_id, status, note} = bookAllotment;
    const changeAbleFields = {
        selectedBook,
        book_id: bookAllotment.book_item.book.id,
        book_item_id,
        status,
        note,
        selectedBookItem: selectedBookItem,
        bookItems,
        selectedMember: members.filter(member => member.id === +bookAllotment.member_id),
        selectedStatus: bookAllotmentStatusOptions.filter(circular => circular.id === +bookAllotment.status)
    };
    useEffect(() => {
        props.fetchBook(bookAllotment.book_item.book.id, false);
    }, []);
    const onSaveBookAllotment = (formValues) => {
        props.editBookAllotment(formValues, bookAllotment.book_item.book.id);
    };
    if (selectedBookItem.length === 0 || changeAbleFields.bookItems.length === 0) {
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
        return [{id: +bookItem.id, name: bookItem.edition + ` (${bookItem.book_item_id})`}]
    }
};
const prepareBookItems = (books) => {
    let bookArray = [];
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return bookArray;
    }
    books[0].items.forEach(book => {
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_item_id})`});
    });
    return bookArray;
};
export default connect(mapStateToProps, {editBookAllotment, fetchBook})(EditBookAllotment);
