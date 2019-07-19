import React, {useState, useEffect, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookAllotmentValidate from './bookAllotmentValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';
import {bookAllotmentStatusOptions} from '../../constants';
import './BooksAllotment.scss';
import {fetchAvailableBooks} from '../../store/actions/availableBooksAction';
import TypeAhead from '../../shared/components/TypeAhead';

let bookId = null;
let memberId = null;
const BookAllotmentForm = props => {
    const [selectedBook] = useState(props.initialValues ? props.initialValues.selectedBook : []);
    const [selectedBookItem] = useState(props.initialValues ? props.initialValues.selectedBookItem : []);
    const [selectedMember] = useState(props.initialValues ? props.initialValues.selectedMember : []);
    const [selectedStatus] = useState(props.initialValues ? props.initialValues.selectedStatus : []);
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [isValidBook, setIsValidBook] = useState(false);
    const [isValidMember, setIsValidMember] = useState(false);
    const [isValidBookItem, setIsValidBookItem] = useState(false);
    const [isValidStatus, setIsValidStatus] = useState(false);
    const bookItemRef = createRef();
    useEffect(() => {
        bookId = null;
        memberId = null;
        if (props.initialValues) {
            bookId = selectedBook[0].id;
            memberId = selectedMember[0].id;
            props.change('book_id', selectedBook[0].id);
            props.change('book_item_id', selectedBookItem[0].id);
            props.change('member_id', selectedMember[0].id);
            props.change('status', selectedStatus[0].id);
            setDisabledItem(false);
        }
    }, []);
    const onSaveBookAllotment = formValues => {
        props.onSaveBookAllotment(formValues);
    };
    const getBooks = () => {
        if (bookId && memberId) {
            setDisabledItem(false);
            props.fetchAvailableBooks(bookId, memberId);
        } else {
            setDisabledItem(true);
            bookItemRef.current.getInstance().clear()
        }
    };
    const onSelectBook = (option) => {
        if (option.length > 0) {
            bookId = option[0].id;
            setIsValidBook(false);
            props.change('book_id', option[0].id);
        } else {
            bookId = null;
            setIsValidBook(true);
            props.change('book_id', null);
        }
        getBooks();
    };
    const onSelectMember = (option) => {
        if (option.length > 0) {
            memberId = option[0].id;
            setIsValidMember(false);
            props.change('member_id', option[0].id);
        } else {
            memberId = null;
            setIsValidMember(true);
            props.change('member_id', null);
        }
        getBooks();
    };
    const onSelectBookItem = (option) => {
        if (option.length > 0) {
            setIsValidBookItem(false);
            props.change('book_item_id', option[0].id);
        } else {
            setIsValidBookItem(true);
            props.change('book_item_id', null);
        }
    };
    const onSelectBookStatus = (option) => {
        if (option.length > 0) {
            setIsValidStatus(false);
            props.change('status', option[0].id);
        } else {
            setIsValidStatus(true);
            props.change('status', null);
        }
    };
    if (!props.books || props.books && props.books.length === 0 || !props.members || props.members && props.members.length === 0) {
        return null;
    }
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <TypeAhead
                    id="book"
                    label="Book"
                    required
                    options={props.books}
                    placeholder="Select Book"
                    onChange={onSelectBook}
                    groupText="book"
                    defaultSelected={selectedBook}
                    isInvalid={isValidBook}
                />
                <Field name="book_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="member"
                    label="Member"
                    required
                    options={props.members}
                    placeholder="Select Member"
                    onChange={onSelectMember}
                    groupText="user-circle-o"
                    defaultSelected={selectedMember}
                    isInvalid={isValidMember}
                />
                <Field name="member_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="book-item"
                    label="Book Item"
                    required
                    options={props.bookItems.length > 0 ? props.bookItems : props.initialValues ? props.initialValues.bookItems : props.bookItems}
                    placeholder="Select Book Item"
                    onChange={onSelectBookItem}
                    groupText="object-group"
                    defaultSelected={selectedBookItem}
                    isInvalid={isValidBookItem}
                    reference={bookItemRef}
                    disabled={isDisabledItem}
                />
                <Field name="book_item_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="status"
                    label="Status"
                    required
                    options={bookAllotmentStatusOptions}
                    placeholder="Select Status"
                    onChange={onSelectBookStatus}
                    groupText="info-circle"
                    defaultSelected={selectedStatus}
                    isInvalid={isValidStatus}
                />
                <Field name="status" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="note" label="Note" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookAllotment)} {...props}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {bookItems: prepareBookItems(state.availableBooks)}
};

const bookAllotmentForm = reduxForm({form: 'bookAllotmentForm', validate: bookAllotmentValidate})(BookAllotmentForm);
const prepareBookItems = (books) => {
    let bookArray = [];
    books.forEach(book => {
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_item_id})`});
    });
    return bookArray;
};
export default connect(mapStateToProps, {fetchAvailableBooks})(bookAllotmentForm);
