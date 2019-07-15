import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import bookSeriesValidate from './bookSeriesValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';

const BookSeriesForm = props => {
    const onSaveBookSeries = formValues => {
        props.onSaveBookSeries(formValues);
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="title" label="Title" required groupText="television" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveBookSeries)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'bookSeriesForm', validate: bookSeriesValidate})(BookSeriesForm);
