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

let bookId = null;
let memberId = null;
const BookAllotmentForm = props => {
    const { initialValues } = props;
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const bookItemRef = createRef();
    useEffect(() => {
        bookId = null;
        memberId = null;
        if (initialValues) {
            const { book, member } = initialValues;
            bookId = book.id;
            memberId = member.id;
            setStatus(initialValues.status.id);
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
                <Field name="book" label="Book" required options={props.books} placeholder="Select Book"
                       onChange={onSelectBook} groupText="book" component={Select} isSearchable={true}
                       innerRef={bookItemRef}/>
            </Col>
            <Col xs={12}>
                <Field name="member" label="Member" required options={props.members} placeholder="Select Member"
                       onChange={onSelectMember} groupText="user-circle-o" component={Select} isSearchable={true}/>
            </Col>
            <Col xs={12}>
                <Field name="book_item" label="Book Item" required
                       options={props.bookItems.length > 0 ? props.bookItems : props.initialValues ? props.initialValues.bookItems : props.bookItems}
                       placeholder="Select Book Item" groupText="object-group" component={Select} isSearchable={true}
                       disabled={isDisabledItem}/>
            </Col>
            <Col xs={12}>
                <Field name="status" label="Status" required options={bookStatusOptions} placeholder="Select Status"
                       onChange={onSelectBookStatus} groupText="info-circle" component={Select}/>
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
