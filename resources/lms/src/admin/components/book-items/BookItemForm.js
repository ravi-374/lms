import React, {createRef, useEffect, useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import bookItemValidate from './bookItemValidate';
import '../book-details/BookDetails.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import {bookFormatOptions, maxDigits} from '../../constants';
import Select from "../../../shared/components/Select";
import {enableDisableUserInput} from "../../../shared/sharedMethod";
import {bookItemStatusOptions, bookItemStatusConstants} from "../../constants";
import {mapCurrencyCode} from "../../../shared/sharedMethod";
import {prepareBookLanguage} from "../books/prepareArray";
import {fetchPublishers} from "../../store/actions/publisherAction";
import {fetchBookLanguages} from "../../store/actions/bookLanguageAction";

const BookItemForm = (props) => {
    const {
        bookLanguages, publishers, saveBookItem, initialValues, currency, fetchBookLanguages,
        fetchPublishers
    } = props;
    const [isDisabledStatus, setDisabledStatus] = useState(false);
    const inputRef = createRef();
    useEffect(() => {
        fetchBookLanguages();
        fetchPublishers();
        prepareInitialValues();
    }, []);
    const prepareInitialValues = () => {
        if (!initialValues) {
            props.change('status', { ...bookItemStatusOptions[0] });
            inputRef.current.focus();
        } else {
            if (initialValues.status && initialValues.status.id === bookItemStatusConstants.UNAVAILABLE) {
                setDisabledStatus(true);
            }
        }
    };
    const onSaveBookItems = (formValues) => {
        const { book_code, edition, format, language, publisher, location, price, status } = formValues;
        saveBookItem({
            book_code,
            edition,
            format: format.id,
            language_id: language.id,
            publisher_id: publisher ? publisher.id : null,
            status: status.id,
            location,
            price
        });
    };
    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={6}>
                <Field name="book_code" label="Book Code" min="1" inputRef={inputRef}
                       onChange={(e) => enableDisableUserInput(e, maxDigits.BOOK_CODE)} type="number"
                       groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name="edition" label="Edition" required groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name="format" label="Format" required options={bookFormatOptions} placeholder="Select Format"
                       groupText="wpforms" component={Select}/>
            </Col>
            <Col xs={6}>
                <Field name="location" label="Location" groupText="map-pin" component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name="price" min="1" type="number" label="Price" required placeholder="Price"
                       groupText={mapCurrencyCode(currency)} component={InputGroup}/>
            </Col>
            <Col xs={6}>
                <Field name="language" label="Language" required options={bookLanguages} placeholder="Select Language"
                       groupText="language" component={Select} isSearchable={true}/>
            </Col>
            <Col>
                <Field name="publisher" label="Publisher" options={publishers} placeholder="Select Publisher"
                       groupText="user-circle-o" component={Select} isSearchable={true}/>
            </Col>
            <Col xs={6}>
                <Field name="status" label="Status" disabled={!initialValues || isDisabledStatus}
                       options={bookItemStatusOptions} placeholder="Select Status" groupText="user-circle-o"
                       component={Select} isSearchable={true}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookItems)} {...props}/>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { publishers, bookLanguages } = state;
    return {
        bookLanguages: prepareBookLanguage(Object.values(bookLanguages)),
        publishers: Object.values(publishers),
    }
};
const bookItemForm = reduxForm({ form: 'bookItemForm', validate: bookItemValidate })(BookItemForm);
export default connect(mapStateToProps, { fetchPublishers, fetchBookLanguages })(bookItemForm);
