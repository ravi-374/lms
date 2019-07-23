import React, {createRef, Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookAllotmentValidate from './bookAllotmentValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';
import {bookAllotmentStatusConstant, bookAllotmentStatusOptions} from '../../constants';
import './BooksAllotment.scss';
import {fetchAvailableBooks} from '../../store/actions/availableBooksAction';
import TypeAhead from '../../shared/components/TypeAhead';
import moment from 'moment';
import DatePicker from '../../shared/components/DatePicker';

let bookId = null;
let memberId = null;
const BookAllotmentForm = props => {
    const {initialValues} = props;
    const [selectedBook] = useState(initialValues ? initialValues.selectedBook : []);
    const [selectedBookItem] = useState(initialValues ? initialValues.selectedBookItem : []);
    const [selectedMember] = useState(initialValues ? initialValues.selectedMember : []);
    const [selectedStatus] = useState(initialValues ? initialValues.selectedStatus : []);
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [isValidBook, setIsValidBook] = useState(false);
    const [isValidMember, setIsValidMember] = useState(false);
    const [isValidBookItem, setIsValidBookItem] = useState(false);
    const [isValidStatus, setIsValidStatus] = useState(false);
    const [status, setStatus] = useState(null);
    const bookItemRef = createRef();
    const [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        bookId = null;
        memberId = null;
        if (initialValues) {
            bookId = selectedBook[0].id;
            memberId = selectedMember[0].id;
            props.change('book_id', selectedBook[0].id);
            props.change('book_item_id', selectedBookItem[0].id);
            props.change('member_id', selectedMember[0].id);
            props.change('status', selectedStatus[0].id);
            setStatus(selectedStatus[0].id);
            setDisabledItem(false);
            if (initialValues.reserve_date) {
                setSelectedDate(moment(initialValues.reserve_date).toDate());
                props.change('reserve_date', initialValues.reserve_date);
            } else if (initialValues.issued_on) {
                setSelectedDate(moment(initialValues.issued_on).toDate());
                props.change('issued_on', initialValues.issued_on);
            } else {
                setSelectedDate(moment(initialValues.return_date).toDate());
                props.change('return_date', initialValues.return_date);
            }
        }
    }, []);
    const prepareFormValues = (formValues) => {
        const {book_id, book_item_id, member_id, note, status} = formValues;
        const formData = {book_id, book_item_id, member_id, note, status};
        switch (status) {
            case bookAllotmentStatusConstant.BOOK_RESERVED:
                formData.reserve_date = selectedDate ? moment(selectedDate).format('YYYY-MM-DD hh:mm:ss') : "";
                break;
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                formData.issued_on = selectedDate ? moment(selectedDate).format('YYYY-MM-DD hh:mm:ss') : "";
                break;
            default:
                formData.return_date = selectedDate ? moment(selectedDate).format('YYYY-MM-DD hh:mm:ss') : "";
                break;
        }
        return formData;
    };
    const onSaveBookAllotment = formValues => {
        props.onSaveBookAllotment(prepareFormValues(formValues));
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
            setStatus(option[0].id);
        } else {
            setIsValidStatus(true);
            props.change('status', null);
            setStatus(null);
        }
    };
    const onSelectDate = (date) => {
        setSelectedDate(date);
    };
    const renderDatePicker = (status) => {
        if (!status) {
            return null;
        }
        let field = '';
        let label = '';
        let maxDate = '';
        switch (status) {
            case bookAllotmentStatusConstant.BOOK_RESERVED:
                label = 'Reserve Date';
                field = 'reserve_date';
                break;
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                label = 'Issue Date';
                field = 'issued_on';
                maxDate = moment().toDate();
                break;
            default:
                label = 'Return Date';
                field = 'return_date';
                break;
        }
        return (
            <Fragment>
                <DatePicker label={label} selected={selectedDate} maxDate={maxDate} onChange={onSelectDate}
                            placeHolder="Click to select a date"/>
                <Field name={field} type="hidden" component={InputGroup}/>
            </Fragment>
        )
    };

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
                {renderDatePicker(status)}
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
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_code})`});
    });
    return bookArray;
};
export default connect(mapStateToProps, {fetchAvailableBooks})(bookAllotmentForm);
