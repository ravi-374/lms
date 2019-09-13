import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import bookLanguageValidate from './bookLanguageValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import './BookLanguages.scss';

const BookLanguageForm = props => {
    const isDisabled = !!props.initialValues;
    const inputRef = createRef();
    useEffect(() => {
        if (!props.initialValues) {
            inputRef.current.focus();
        }
    }, []);
    const onSaveBookLanguage = formValues => {
        props.onSaveBookLanguage(formValues);
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="language_name" label="Name" required inputRef={inputRef} groupText="language"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="language_code" className="code-field" readOnly={isDisabled} label="Code" required groupText="code"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookLanguage)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'bookLanguageForm', validate: bookLanguageValidate})(BookLanguageForm);
