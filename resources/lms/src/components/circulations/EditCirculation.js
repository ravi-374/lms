import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editCirculation} from '../../store/actions/circulationAction';
import CirculationForm from './CirculationForm';
import {fetchBook} from '../../store/actions/bookAction';
import {circularOptions} from '../../constants';

const EditCirculation = (props) => {
    const {toggleModal, className, title, books, selectedBook, circulation, onSelectBook, bookId, members, bookItems, selectedBookItem} = props;
    const modalOption = {toggleModal, className, title};
    const formOption = {books, onSelectBook, bookId, members};
    const {book_item_id, status, note} = circulation;
    const changeAbleFields = {
        selectedBook,
        book_id: circulation.book_item.book.id,
        book_item_id,
        status,
        note,
        selectedBookItem: selectedBookItem,
        bookItems,
        selectedIndex: selectedBookItem.length > 0 ? bookItems.findIndex(bookItem => bookItem.id === +selectedBookItem[0].id) : -1,
        selectedMember: members.filter(member => member.id === +circulation.member_id),
        selectedStatus: circularOptions.filter(circular => circular.id === +circulation.status)
    };
    useEffect(() => {
        props.fetchBook(circulation.book_item.book.id, false);
    }, []);
    const onSaveCirculation = (formValues) => {
        props.editCirculation(formValues, circulation.book_item.book.id);
    };
    if (selectedBookItem.length === 0 || (changeAbleFields.selectedIndex < 0)) {
        return null;
    }
    const prepareFormOption = {
        onSaveCirculation,
        onCancel: toggleModal,
        initialValues: changeAbleFields
    };
    return <Modal {...modalOption} content={<CirculationForm {...prepareFormOption} {...formOption} />}/>
};
const mapStateToProps = (state, ownProps) => {
    const filterArray = ownProps.books.filter(book => book.id === +ownProps.circulation.book_item.book.id);
    return {
        selectedBook: filterArray,
        selectedBookItem: prepareBookItem(filterArray, ownProps.circulation),
        bookItems: prepareBookItems(filterArray),
    }
};
const prepareBookItems = (books) => {
    let bookArray = [{id: 0, name: 'Select Book Item'}];
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return bookArray;
    }
    books[0].items.forEach(book => {
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_item_id})`});
    });
    return bookArray;
};
const prepareBookItem = (books, circulation = null) => {
    if (books.length === 0 || books.length > 0 && !books[0].items) {
        return [];
    }
    return books[0].items.filter(book => book.id === +circulation.book_item_id);
};
export default connect(mapStateToProps, {editCirculation, fetchBook})(EditCirculation);
