import React, {Fragment, useEffect, useState, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookAllotmentValidate from './bookAllotmentValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from '../../../shared/components/TextArea';
import {bookAllotmentStatusConstant, bookStatusOptions} from '../../constants';
import './BooksAllotment.scss';
import {fetchAvailableBooks} from '../../store/actions/availableBooksAction';
import moment from 'moment';
import DatePicker from '../../../shared/components/DatePicker';
import Select from "../../../shared/components/Select";
import {dateFormat} from "../../../constants";

let bookId = null;
let memberId = null;
const BookAllotmentForm = props => {
    const { initialValues } = props;
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const bookItemRef = createRef();
    const isDisabledStatus =
        initialValues && initialValues.status && initialValues.status.id === bookAllotmentStatusConstant.BOOK_RETURNED;
    useEffect(() => {
        bookId = null;
        memberId = null;
        if (initialValues) {
            setStatus(initialValues.status.id);
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
        } else {
            bookItemRef.current.select.focus();
        }
    }, []);
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
    const onSaveBookAllotment = formValues => {
        props.onSaveBookAllotment(prepareFormValues(formValues));
    };
    const getBooks = () => {
        if (bookId && memberId) {
            setDisabledItem(false);
            props.fetchAvailableBooks(bookId, memberId);
        } else {
            setDisabledItem(true);
            props.change('book_item', null);
        }
    };
    const onSelectBook = (option) => {
        props.change('book_item', null);
        bookId = option.id;
        getBooks();
    };
    const onSelectMember = (option) => {
        props.change('book_item', null);
        memberId = option.id;
        getBooks();
    };
    const onSelectBookStatus = (option) => {
        setSelectedDate(moment().toDate());
        setStatus(option.id);
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
            case bookAllotmentStatusConstant.BOOK_RETURNED:
                label = 'Return Date';
                field = 'return_date';
                break;
            default:
                return null;
        }
        return (
            <Fragment>
                <DatePicker label={label} selected={selectedDate} disabled={isDisabledStatus} maxDate={maxDate}
                            onChange={onSelectDate} placeHolder="Click to select a date"/>
                <Field name={field} type="hidden" component={InputGroup}/>
            </Fragment>
        )
    };

    const renderBookStatusOption = () => {
        if (initialValues) {
            switch (initialValues.status.id) {
                case bookAllotmentStatusConstant.BOOK_RESERVED:
                    return bookStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_UN_RESERVED);
                case bookAllotmentStatusConstant.BOOK_UN_RESERVED:
                    return bookStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_RESERVED);
                case bookAllotmentStatusConstant.BOOK_ISSUED:
                    return bookStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_RETURNED
                        || bookStatus.id === bookAllotmentStatusConstant.BOOK_LOST);
                case  bookAllotmentStatusConstant.BOOK_LOST:
                    return bookStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_RETURNED);
                default:
                    return [];
            }
        } else {
            return bookStatusOptions.filter(bookStatus => bookStatus.id === bookAllotmentStatusConstant.BOOK_ISSUED
                || bookStatus.id === bookAllotmentStatusConstant.BOOK_RESERVED);
        }
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={6}>
                <Row>
                    <Col xs={12}>
                        <Field name="book" label="Book" required options={props.books} placeholder="Select Book"
                               onChange={onSelectBook} groupText="book" component={Select} isSearchable={true}
                               innerRef={bookItemRef} disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="member" label="Member" required options={props.members} placeholder="Select Member"
                               onChange={onSelectMember} groupText="user-circle-o" component={Select}
                               isSearchable={true} disabled={initialValues}/>
                    </Col>
                    <Col xs={12}>
                        <Field name="book_item" label="Book Item" required options={props.bookItems}
                               placeholder="Select Book Item" groupText="object-group" component={Select}
                               isSearchable={true} disabled={isDisabledItem || initialValues}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Field name="note" rows="10" label="Note" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={6}>
                        <Field name="status" label="Status" required options={renderBookStatusOption()}
                               placeholder="Select Status" onChange={onSelectBookStatus} groupText="info-circle"
                               component={Select} disabled={isDisabledStatus}/>
                    </Col>
                    <Col xs={6}>
                        {renderDatePicker(status)}
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookAllotment)} {...props}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return { bookItems: prepareBookItems(state.availableBooks) }
};

const bookAllotmentForm = reduxForm({ form: 'bookAllotmentForm', validate: bookAllotmentValidate })(BookAllotmentForm);
const prepareBookItems = (books) => {
    let bookArray = [];
    books.forEach(book => {
        bookArray.push({ id: +book.id, name: book.edition + ` (${book.book_code})` });
    });
    return bookArray;
};
export default connect(mapStateToProps, { fetchAvailableBooks })(bookAllotmentForm);
