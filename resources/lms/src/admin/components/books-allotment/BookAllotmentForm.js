import React, {Fragment, useEffect, useState, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import bookAllotmentValidate from './bookAllotmentValidate';
import './BooksAllotment.scss';
import {bookAllotmentStatusConstant, bookStatusOptions} from '../../constants';
import {dateFormat} from "../../../constants";
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from '../../../shared/components/TextArea';
import DatePicker from '../../../shared/components/DatePicker';
import Select from "../../../shared/components/Select";
import {getFormattedMessage, getFormattedOptions, prepareFullNames} from "../../../shared/sharedMethod";
import {fetchBooks} from "../../store/actions/bookAction";
import {fetchMembers} from "../../store/actions/memberAction";
import {fetchAvailableBooks} from '../../store/actions/availableBooksAction';

let bookId = null;
let memberId = null;
const BookAllotmentForm = props => {
    const {
        initialValues, books, members, change, bookItems, fetchBooks,
        fetchMembers, fetchAvailableBooks, onSaveBookAllotment, handleSubmit
    } = props;
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const bookItemRef = createRef();
    const isDisabledStatus =
        initialValues && initialValues.status && initialValues.status.id === bookAllotmentStatusConstant.BOOK_RETURNED;
    const bookAllotmentStatusOptions = getFormattedOptions(bookStatusOptions);

    useEffect(() => {
        fetchBooks();
        fetchMembers();
        prepareInitialValues();
    }, []);

    const prepareInitialValues = () => {
        bookId = null;
        memberId = null;
        if (initialValues) {
            setStatus(initialValues.status.id);
            if (initialValues.reserve_date && initialValues.status.id === bookAllotmentStatusConstant.BOOK_RESERVED) {
                setSelectedDate(moment(initialValues.reserve_date).toDate());
                props.change('reserve_date', initialValues.reserve_date);
            } else if (initialValues.issued_on && initialValues.status.id === bookAllotmentStatusConstant.BOOK_ISSUED) {
                setSelectedDate(moment(initialValues.issued_on).toDate());
                props.change('issued_on', initialValues.issued_on);
            } else if (initialValues.return_date && initialValues.status.id === bookAllotmentStatusConstant.BOOK_RETURNED) {
                setSelectedDate(moment(initialValues.return_date).toDate());
                props.change('return_date', initialValues.return_date);
            }
        } else {
            bookItemRef.current.select.focus();
        }
    };

    const prepareFormValues = (formValues) => {
        const { book, book_item, member, note } = formValues;
        const formData = {
            book_id: book.id,
            book_item_id: book_item.id,
            member_id: member.id,
            note,
            status: formValues.status.id
        };
        switch (status) {
            case bookAllotmentStatusConstant.BOOK_RESERVED:
                formData.reserve_date = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                formData.issued_on = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            case bookAllotmentStatusConstant.BOOK_RETURNED:
                formData.return_date = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            default:
                break;
        }
        return formData;
    };

    const onSave = formValues => {
        onSaveBookAllotment(prepareFormValues(formValues));
    };

    const getBooks = () => {
        if (bookId && memberId) {
            setDisabledItem(false);
            fetchAvailableBooks(bookId, memberId);
        } else {
            setDisabledItem(true);
            change('book_item', null);
        }
    };

    const onSelectBook = (option) => {
        props.change('book_item', null);
        bookId = option ? option.id : null;
        getBooks();
    };

    const onSelectMember = (option) => {
        props.change('book_item', null);
        memberId = option ? option.id : null;
        getBooks();
    };

    const onSelectBookStatus = (option) => {
        if (option) {
            setSelectedDate(moment().toDate());
            setStatus(option.id);
        } else {
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
        let minDate = '';
        switch (status) {
            case bookAllotmentStatusConstant.BOOK_RESERVED:
                minDate = moment().toDate();
                label = getFormattedMessage('books-allotment.table.reserve-date.column');
                field = 'reserve_date';
                break;
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                maxDate = initialValues && initialValues.reserve_date ? moment().subtract(
                    moment().diff(moment(initialValues.reserve_date), 'days') - 1, 'days').toDate() : moment().toDate();
                minDate = initialValues && initialValues.reserve_date ? moment().toDate() : '';
                label = getFormattedMessage('books-allotment.table.issue-date.column');
                field = 'issued_on';
                break;
            case bookAllotmentStatusConstant.BOOK_RETURNED:
                minDate = moment().subtract(moment().diff(moment(initialValues.issued_on), 'days'), 'days').toDate();
                maxDate = moment().toDate();
                label = getFormattedMessage('books-allotment.table.return-date.column');
                field = 'return_date';
                break;
            default:
                return null;
        }
        return (
            <Fragment>
                <DatePicker label={label} selected={selectedDate} disabled={isDisabledStatus} maxDate={maxDate}
                            minDate={minDate} onChange={onSelectDate} placeHolder="Click to select a date"/>
                <Field name={field} type="hidden" component={InputGroup}/>
            </Fragment>
        )
    };

    const renderBookStatusOption = () => {
        if (initialValues) {
            switch (initialValues.status.id) {
                case bookAllotmentStatusConstant.BOOK_RESERVED:
                    return bookAllotmentStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_UN_RESERVED);
                case bookAllotmentStatusConstant.BOOK_UN_RESERVED:
                    return bookAllotmentStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_RESERVED);
                case bookAllotmentStatusConstant.BOOK_ISSUED:
                    return bookAllotmentStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_RETURNED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_LOST);
                case  bookAllotmentStatusConstant.BOOK_LOST:
                    return bookAllotmentStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_RETURNED);
                default:
                    return [];
            }
        } else {
            return bookAllotmentStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                || bookStatus.id === bookAllotmentStatusConstant.BOOK_RESERVED);
        }
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={6}>
                <Row>
                    <Col xs={12}>
                        <Field name="book" label="books-allotment.select.book.label" required options={books}
                               placeholder="books-allotment.select.book.placeholder" onChange={onSelectBook}
                               groupText="book" component={Select} isSearchable={true} innerRef={bookItemRef}
                               disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="member" label="books-allotment.select.member.label" required options={members}
                               placeholder="books-allotment.select.member.placeholder" onChange={onSelectMember}
                               groupText="user-circle-o" component={Select} isSearchable={true}
                               disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="book_item" label="books-allotment.select.book-item.label" required
                               options={bookItems} placeholder="books-allotment.select.book-item.placeholder"
                               groupText="object-group" component={Select} isSearchable={true}
                               disabled={isDisabledItem || initialValues}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Field name="note" rows="10" label="books-allotment.input.note.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={6}>
                        <Field name="status" label="books-allotment.select.status.label" required
                               options={renderBookStatusOption()}
                               placeholder="books-allotment.select.status.placeholder" onChange={onSelectBookStatus}
                               groupText="info-circle" component={Select} disabled={isDisabledStatus}/>
                    </Col>
                    <Col xs={6}>
                        {renderDatePicker(status)}
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};


BookAllotmentForm.propTypes = {
    initialValues: PropTypes.object,
    books: PropTypes.array,
    bookItems: PropTypes.array,
    members: PropTypes.array,
    onSaveBookAllotment: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    fetchBooks: PropTypes.func,
    fetchMembers: PropTypes.func,
    fetchAvailableBooks: PropTypes.func,
    toggleModal: PropTypes.func,
};

const prepareBookItems = (books) => {
    let bookArray = [];
    books.forEach(book => {
        bookArray.push({ id: +book.id, name: book.edition + ` (${book.book_code})` });
    });
    return bookArray;
};

const mapStateToProps = (state) => {
    const { books, members, availableBooks } = state;
    return { books, members: prepareFullNames(members), bookItems: prepareBookItems(availableBooks) }
};

const bookAllotmentForm = reduxForm({ form: 'bookAllotmentForm', validate: bookAllotmentValidate })(BookAllotmentForm);

export default connect(mapStateToProps, { fetchAvailableBooks, fetchBooks, fetchMembers })(bookAllotmentForm);
