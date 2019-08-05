import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookItemValidate from './bookItemValidate';
import '../book-details/BookDetails.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import PriceInput from '../../../shared/components/PriceInput';
import {bookFormatOptions} from '../../constants';
import TypeAhead from '../../../shared/components/TypeAhead';

const BookItemForm = (props) => {
    const {bookLanguages, initialValues, publishers, change, saveBookItem} = props;
    const [selectedLanguage] = useState(initialValues ? initialValues.selectedLanguage : []);
    const [selectedPublisher] = useState(initialValues ? initialValues.selectedPublisher : []);
    const [selectedFormat] = useState(initialValues ? initialValues.selectedFormat : []);
    const [isValidFormat, setIsValidFormat] = useState(false);
    const [isValidLanguage, setIsValidLanguage] = useState(false);
    useEffect(() => {
        if (initialValues) {
            change('format', selectedFormat[0].id);
            change('language_id', selectedLanguage[0].id);
            if (selectedPublisher.length > 0) {
                change('publisher_id', selectedPublisher[0].id);
            }
        }
    }, []);
    const onSaveBookItems = (formValues) => {
        const {book_code, edition, format, language_id, publisher_id, location, price} = formValues;
        saveBookItem({book_code, edition, format, language_id, publisher_id, location, price});
    };
    const onSelectBookFormat = (option) => {
        if (option.length > 0) {
            change('format', option[0].id);
            setIsValidFormat(false);
        } else {
            change('format', null);
            setIsValidFormat(true);
        }
    };
    const onSelectPublisher = (option) => {
        if (option.length > 0) {
            change('publisher_id', option[0].id);
        } else {
            change('publisher_id', null);
        }
    };
    const onSelectBookLanguage = (option) => {
        if (option.length > 0) {
            change('language_id', option[0].id);
            setIsValidLanguage(false);
        } else {
            change('language_id', null);
            setIsValidLanguage(true);
        }
    };
    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={12}>
                <Field name="book_code" label="Book Code" type="number" groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="edition" label="Edition" required groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="format"
                    label="Format"
                    required
                    options={bookFormatOptions}
                    placeholder="Select Format"
                    onChange={onSelectBookFormat}
                    groupText="wpforms"
                    defaultSelected={selectedFormat}
                    isInvalid={isValidFormat}
                />
                <Field name="format" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="location" label="Location" groupText="map-pin" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="price" min="1" type="number" label="Price" required placeholder="Price" groupText="money"
                       component={PriceInput}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="language"
                    label="Language"
                    required
                    options={bookLanguages}
                    placeholder="Select Language"
                    onChange={onSelectBookLanguage}
                    groupText="language"
                    defaultSelected={selectedLanguage}
                    isInvalid={isValidLanguage}
                    dropUp={true}
                />
                <Field name="language_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <TypeAhead
                    id="publisher"
                    label="Publisher"
                    options={publishers}
                    placeholder="Select Publisher"
                    onChange={onSelectPublisher}
                    groupText="user-circle-o"
                    defaultSelected={selectedPublisher}
                    dropUp={true}
                />
                <Field name="publisher_id" type="hidden" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookItems)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'bookItemForm', validate: bookItemValidate})(BookItemForm);
