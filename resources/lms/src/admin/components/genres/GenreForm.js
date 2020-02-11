import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import genreValidate from './genreValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from "../../../shared/components/TextArea";

const GenreForm = props => {
    const { onSaveGenre, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveGenre(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="genres.input.name.label" required inputRef={inputRef} groupText="list-alt"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="genres.input.description.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

GenreForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveGenre: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'genreForm', validate: genreValidate })(GenreForm);
