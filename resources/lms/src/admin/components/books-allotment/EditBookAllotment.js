import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editBookAllotment, editBookAllotmentStatus} from '../../store/actions/bookAllotmentAction';
import {editMemberBookHistory} from '../../store/actions/memberBookHistoryAction';
import BookAllotmentForm from './BookAllotmentForm';
import {fetchBook} from '../../store/actions/bookAction';
import {bookStatusOptions} from '../../constants';
import moment from 'moment';
import {bookAllotmentStatusConstant} from "../../constants";

const EditBookAllotment = (props) => {
    const { toggleModal, className, title, books, selectedBook, bookAllotment, onSelectBook, bookId, members, bookItems, isMemberBookHistory } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };
    const { note, reserve_date, issued_on, return_date } = bookAllotment;
    const changeAbleFields = {
        selectedBook,
        book: bookAllotment.book_item.book,
        note,
        reserve_date: reserve_date ? moment(reserve_date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        issued_on: issued_on ? moment(issued_on, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        return_date: return_date ? moment(return_date, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD') : '',
        book_item: {
            id: bookAllotment.book_item.id,
            name: bookAllotment.book_item.edition + ` (${bookAllotment.book_item.book_code})`
        },
        bookItems,
        member: members.find(member => member.id === +bookAllotment.member_id),
        status: bookStatusOptions.find(circular => circular.id === +bookAllotment.status)
    };
    const onSaveBookAllotment = (formValues) => {
        if (!isMemberBookHistory) {
            switch (formValues.status) {
                case bookAllotmentStatusConstant.BOOK_LOST:
                case bookAllotmentStatusConstant.BOOK_DAMAGED:
                    props.editBookAllotmentStatus(formValues);
                    break;
                default:
                    props.editBookAllotment(formValues);
                    break;
            }
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
        bookItems: prepareBookItems(filterArray),
    }
};

const prepareBookItems = (books) => {
    let bookArray = [];
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return bookArray;
    }
    books[0].items.forEach(book => {
        bookArray.push({ id: +book.id, name: book.edition + ` (${book.book_code})` });
    });
    return bookArray;
};
export default connect(mapStateToProps, {
    editBookAllotment,
    editMemberBookHistory,
    editBookAllotmentStatus,
})(EditBookAllotment);
