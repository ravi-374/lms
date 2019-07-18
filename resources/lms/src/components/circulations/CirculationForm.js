import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import issueBookValidate from './circulationValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';
import MultiSelect from '../../shared/multi-select/MultiSelect';
import {circularOptions} from '../../constants';
import './Circulations.scss';
import {fetchAvailableBooks} from '../../store/actions/availableBooksAction';

let bookId = null;
let memberId = null;
const CirculationForm = props => {
    const [selectedBook] = useState(props.initialValues ? props.initialValues.selectedBook : []);
    const [selectedBookItem] = useState(props.initialValues ? props.initialValues.selectedBookItem : []);
    const [selectedMember] = useState(props.initialValues ? props.initialValues.selectedMember : []);
    const [selectedStatus] = useState(props.initialValues ? props.initialValues.selectedStatus : []);
    const [isDisabledItem, setDisabledItem] = useState(true);
    const [index, setIndex] = useState(props.initialValues ? props.selectedIndex : 0);
    useEffect(() => {
        bookId = null;
        memberId = null;
        if (props.initialValues) {
            props.change('book_id', selectedBook[0].id);
            props.change('book_item_id', selectedBookItem[0].id);
            props.change('member_id', selectedMember[0].id);
            props.change('status', selectedStatus[0].id);
            setDisabledItem(false);
            setIndex(props.initialValues.bookItems.findIndex(book => book.id === +selectedBookItem[0].id));
        }
    }, []);
    const onSaveIssueBook = formValues => {
        props.onSaveCirculation(formValues);
    };
    const getBooks = () => {
        if (bookId && memberId) {
            setDisabledItem(false);
            props.fetchAvailableBooks(bookId, memberId);
        } else {
            setDisabledItem(true);
        }
        setIndex(0);
    };
    const onSelectBook = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            bookId = option[0].id;
            props.change('book_id', option[0].id);
        } else {
            bookId = null;
            props.change('book_id', null);
        }
        getBooks();
    };
    const onSelectMember = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            memberId = option[0].id;
            props.change('member_id', option[0].id);
        } else {
            memberId = null;
            props.change('member_id', null);
        }
        getBooks();
    };
    const onSelectBookItems = (option, index = 0) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('book_item_id', option[0].id);
        } else {
            props.change('book_item_id', null);
        }
        setIndex(index);
    };
    const onSelectBookStatus = (option) => {
        if (option.length > 0 && option[0].id !== 0) {
            props.change('status', option[0].id);
        } else {
            props.change('status', null);
        }
    };
    if (!props.books || props.books && props.books.length === 0 || !props.members || props.members && props.members.length === 0) {
        return null;
    }
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12} className="mb-1">
                <MultiSelect
                    label="Book"
                    placeholder="Select Book"
                    groupText="book"
                    options={props.books}
                    onSelect={onSelectBook}
                    required
                    selctedItems={selectedBook}
                />
                <Field name="book_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12} className="mb-1">
                <MultiSelect
                    label="Member"
                    placeholder="Select Member"
                    groupText="user-circle-o"
                    options={props.members}
                    onSelect={onSelectMember}
                    required
                    selctedItems={selectedMember}
                />
                <Field name="member_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12} className="mb-1">
                <MultiSelect
                    label="Book Item"
                    placeholder="Select Book Item"
                    groupText="object-group"
                    options={props.bookItems.length > 1 ? props.bookItems : props.initialValues ? props.initialValues.bookItems : props.bookItems}
                    onSelect={onSelectBookItems}
                    required
                    disabled={isDisabledItem}
                    selctedItems={selectedBookItem}
                    index={index}
                />
                <Field name="book_item_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <MultiSelect
                    label="Status"
                    placeholder="Select Status"
                    groupText="info-circle"
                    options={circularOptions}
                    onSelect={onSelectBookStatus}
                    required
                    selctedItems={selectedStatus}
                />
                <Field name="status" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="note" label="Note" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveIssueBook)} {...props}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {bookItems: prepareBookItems(state.availableBooks)}
};

const issueForm = reduxForm({form: 'circulationForm', validate: issueBookValidate})(CirculationForm);
const prepareBookItems = (books) => {
    let bookArray = [{id: 0, name: 'Select Book Item'}];
    books.forEach(book => {
        bookArray.push({id: +book.id, name: book.edition + ` (${book.book_item_id})`});
    });
    return bookArray;
};
export default connect(mapStateToProps, {fetchAvailableBooks})(issueForm);
