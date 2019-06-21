import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import publisherValidate from './publisherValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';

const PublisherForm = props => {
    const onSavePublisher = formValues => {
        props.onSavePublisher(formValues);
    };
    return (
            <Row className="animated fadeIn m-3">
                <Col xs={12}>
                    <Field name="name" label="Name" required groupText="user-circle-o" component={InputGroup}/>
                </Col>
                <Col xs={12}>
                    <SaveAction onSave={props.handleSubmit(onSavePublisher)} {...props}/>
                </Col>
            </Row>
    );
};

export default reduxForm({form: 'publisherForm', validate: publisherValidate})(PublisherForm);
