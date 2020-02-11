import React, {useEffect, useState, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import bookCirculationValidate from './bookCirculationValidate';
import './BooksCirculation.scss';
import {bookCirculationStatusConstant, bookStatusOptions} from '../../constants';
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
import {fetchAvailableBookLimit, clearAvailableBookLimit} from "../../store/actions/availableBookLimitAction";

let bookId = null;
let memberId = null;

const BookCirculationForm = props => {
    const {
        initialValues, books, members, change, bookItems, fetchBooks,
        fetchMembers, fetchAvailableBooks, onSaveBookCirculation, handleSubmit, fetchAvailableBookLimit,
        clearAvailableBookLimit
    } = props;
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const bookItemRef = createRef();
    const isDisabledStatus =
        initialValues && initialValues.status && initialValues.status.id === bookCirculationStatusConstant.BOOK_RETURNED;
    const bookCirculationStatusOptions = getFormattedOptions(bookStatusOptions);

    useEffect(() => {
        prepareInitialValues();
        fetchBooks();
        fetchMembers();
        prepareInitialValues();
        clearAvailableBookLimit();
    }, []);

    const prepareInitialValues = () => {
        bookId = null;
        memberId = null;
        if (initialValues) {
            setStatus(initialValues.status.id);
            memberId = initialValues.member.id;
            if (initialValues.reserve_date && initialValues.status.id === bookCirculationStatusConstant.BOOK_RESERVED) {
                setSelectedDate(moment(initialValues.reserve_date).toDate());
                props.change('reserve_date', initialValues.reserve_date);
            } else if (initialValues.issued_on && initialValues.status.id === bookCirculationStatusConstant.BOOK_ISSUED) {
                setSelectedDate(moment(initialValues.issued_on).toDate());
                props.change('issued_on', initialValues.issued_on);
            } else if (initialValues.return_date && initialValues.status.id === bookCirculationStatusConstant.BOOK_RETURNED) {
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
            case bookCirculationStatusConstant.BOOK_RESERVED:
                formData.reserve_date = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            case bookCirculationStatusConstant.BOOK_ISSUED:
                formData.issued_on = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            case bookCirculationStatusConstant.BOOK_RETURNED:
                formData.return_date = selectedDate ? moment(selectedDate).format(dateFormat.DEFAULT_MOMENT) : '';
                break;
            default:
                break;
        }
        return formData;
    };

    const onSave = formValues => {
        onSaveBookCirculation(prepareFormValues(formValues));
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

    const checkBookLimits = (status) => {
        if (memberId && status) {
            if (status === bookCirculationStatusConstant.BOOK_RESERVED ||
                status === bookCirculationStatusConstant.BOOK_ISSUED) {
                fetchAvailableBookLimit(memberId, status);
            } else {
                clearAvailableBookLimit();
            }
        }
    };

    const onSelectBook = (option) => {
        props.change('book_item', null);
        bookId = option ? option.id : null;
        getBooks();
        checkBookLimits(status);
    };

    const onSelectMember = (option) => {
        props.change('book_item', null);
        memberId = option ? option.id : null;
        getBooks();
        checkBookLimits(status);
    };

    const onSelectBookStatus = (option) => {
        if (option) {
            setSelectedDate(moment().toDate());
            setStatus(option.id);
            checkBookLimits(option.id);
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
            case bookCirculationStatusConstant.BOOK_RESERVED:
                minDate = moment().toDate();
                label = getFormattedMessage('books-circulation.table.reserve-date.column');
                field = 'reserve_date';
                break;
            case bookCirculationStatusConstant.BOOK_ISSUED:
                maxDate = initialValues && initialValues.reserve_date ? moment().subtract(
                    moment().diff(moment(initialValues.reserve_date), 'days') - 1, 'days').toDate() : moment().toDate();
                minDate = initialValues && initialValues.reserve_date ? moment().toDate() : '';
                label = getFormattedMessage('books-circulation.table.issue-date.column');
                field = 'issued_on';
                break;
            case bookCirculationStatusConstant.BOOK_RETURNED:
                minDate = moment().subtract(moment().diff(moment(initialValues.issued_on), 'days'), 'days').toDate();
                maxDate = moment().toDate();
                label = getFormattedMessage('books-circulation.table.return-date.column');
                field = 'return_date';
                break;
            default:
                return null;
        }
        return (
            <>
                <DatePicker label={label} selected={selectedDate} disabled={isDisabledStatus} maxDate={maxDate}
                            minDate={minDate} onChange={onSelectDate} placeHolder="Click to select a date"/>
                <Field name={field} type="hidden" component={InputGroup}/>
            </>
        )
    };

    const renderBookStatusOption = () => {
        if (initialValues) {
            switch (initialValues.status.id) {
                case bookCirculationStatusConstant.BOOK_RESERVED:
                    return bookCirculationStatusOptions.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookCirculationStatusConstant.BOOK_UN_RESERVED);
                case bookCirculationStatusConstant.BOOK_UN_RESERVED:
                    return bookCirculationStatusOptions.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookCirculationStatusConstant.BOOK_RESERVED);
                case bookCirculationStatusConstant.BOOK_ISSUED:
                    return bookCirculationStatusOptions.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.BOOK_RETURNED
                        || bookStatus.id === bookCirculationStatusConstant.BOOK_LOST || bookStatus.id === bookCirculationStatusConstant.BOOK_DAMAGED);
                case  bookCirculationStatusConstant.BOOK_LOST:
                case  bookCirculationStatusConstant.BOOK_DAMAGED:
                    return bookCirculationStatusOptions.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.BOOK_RETURNED);
                default:
                    return [];
            }
        } else {
            return bookCirculationStatusOptions.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.BOOK_ISSUED
                || bookStatus.id === bookCirculationStatusConstant.BOOK_RESERVED);
        }
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={6}>
                <Row>
                    <Col xs={12}>
                        <Field name="book" label="books-circulation.select.book.label" required options={books}
                               placeholder="books-circulation.select.book.placeholder" onChange={onSelectBook}
                               groupText="book" component={Select} isSearchable={true} innerRef={bookItemRef}
                               disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="member" label="books-circulation.select.member.label" required options={members}
                               placeholder="books-circulation.select.member.placeholder" onChange={onSelectMember}
                               groupText="user-circle-o" component={Select} isSearchable={true}
                               disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="book_item" label="books-circulation.select.book-item.label" required
                               options={bookItems} placeholder="books-circulation.select.book-item.placeholder"
                               groupText="object-group" component={Select} isSearchable={true}
                               disabled={isDisabledItem || initialValues}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Field name="note" rows="10" label="books-circulation.input.note.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={6}>
                        <Field name="status" label="books-circulation.select.status.label" required
                               options={renderBookStatusOption()}
                               placeholder="books-circulation.select.status.placeholder" onChange={onSelectBookStatus}
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

BookCirculationForm.propTypes = {
    initialValues: PropTypes.object,
    books: PropTypes.array,
    bookItems: PropTypes.array,
    members: PropTypes.array,
    onSaveBookCirculation: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    fetchBooks: PropTypes.func,
    fetchMembers: PropTypes.func,
    fetchAvailableBooks: PropTypes.func,
    toggleModal: PropTypes.func,
    fetchAvailableBookLimit: PropTypes.func,
    clearAvailableBookLimit:PropTypes.func,
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

const bookCirculationForm = reduxForm({
    form: 'bookCirculationForm',
    validate: bookCirculationValidate
})(BookCirculationForm);

export default connect(mapStateToProps, {
    fetchAvailableBooks, fetchBooks, fetchMembers,
    fetchAvailableBookLimit, clearAvailableBookLimit,
})(bookCirculationForm);
