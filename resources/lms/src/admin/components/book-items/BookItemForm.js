import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookItemValidate from './bookItemValidate';
import '../book-details/BookDetails.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import PriceInput from '../../../shared/components/PriceInput';
import {bookFormatOptions, maxDigits} from '../../constants';
import Select from "../../../shared/components/Select";
import {enableDisableUserInput} from "../../../shared/sharedMethod";

const BookItemForm = (props) => {
    const {bookLanguages, publishers, saveBookItem,initialValues} = props;
    const onSaveBookItems = (formValues) => {
        const {book_code, edition, format, language, publisher, location, price} = formValues;
        saveBookItem({
            book_code,
            edition,
            format: format.id,
            language_id: language.id,
            publisher_id: publisher.id,
            location,
            price
        });
    };
    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={12}>
                <Field name="book_code" label="Book Code" min="1" autoFocus={!!initialValues}
                       onChange={(e) => enableDisableUserInput(e, maxDigits.BOOK_CODE)}
                       type="number" groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="edition" label="Edition" required groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field
                    name="format"
                    label="Format"
                    required
                    options={bookFormatOptions}
                    placeholder="Select Format"
                    groupText="wpforms"
                    component={Select}
                />
            </Col>
            <Col xs={12}>
                <Field name="location" label="Location" groupText="map-pin" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="price" min="1" type="number" label="Price" required placeholder="Price" groupText="money"
                       component={PriceInput}/>
            </Col>
            <Col xs={12}>
                <Field
                    name="language"
                    label="Language"
                    required
                    options={bookLanguages}
                    placeholder="Select Language"
                    groupText="language"
                    component={Select}
                    isSearchable={true}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="publisher"
                    label="Publisher"
                    options={publishers}
                    placeholder="Select Publisher"
                    groupText="user-circle-o"
                    component={Select}
                    isSearchable={true}
                />
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookItems)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'bookItemForm', validate: bookItemValidate})(BookItemForm);
