import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import authorValidate from './authorValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from '../../shared/components/TextArea';

const AuthorForm = props => {
    const onSaveAuthor = formValues => {
        props.onSaveAuthor(formValues);
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="first_name" label="First Name" required groupText="user-circle-o" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="last_name" label="Last Name" required groupText="user" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="Description" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveAuthor)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'authorForm', validate: authorValidate})(AuthorForm);
