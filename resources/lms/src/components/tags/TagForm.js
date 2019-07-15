import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import tagValidate from './tagValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';

const TagForm = props => {
    const onSaveTag = formValues => {
        props.onSaveTag(formValues);
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="Name" required groupText="tag" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveTag)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'tagForm', validate: tagValidate})(TagForm);
