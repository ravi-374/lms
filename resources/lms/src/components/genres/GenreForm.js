import React from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import genreValidate from './genreValidate';
import InputGroup from '../../shared/components/InputGroup';
import SaveAction from '../../shared/action-buttons/SaveAction';
import TextArea from "../../shared/components/TextArea";

const GenreForm = props => {
    const onSaveGenre = formValues => {
        props.onSaveGenre(formValues);
    };
    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="Name" required groupText="list-alt" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="Description" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={props.handleSubmit(onSaveGenre)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({form: 'genreForm', validate: genreValidate})(GenreForm);
