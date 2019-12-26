import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import changePasswordValidate from "./changePasswordValidate";

const ChangePasswordForm = props => {
    const { onSaveChangePassword, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveChangePassword(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name={'current_password'} type="password" label="change-password.input.old_password.label" required
                       autoComplete={'off'} inputRef={inputRef} groupText="lock" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name={'password'} type="password" label="change-password.input.password.label" required
                       autoComplete={'off'} groupText="lock" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name={'confirm_password'} type="password" label="change-password.input.confirm-password.label"
                       autoComplete={'off'} required groupText="lock" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

ChangePasswordForm.propTypes = {
    onSaveChangePassword: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'changePasswordForm', validate: changePasswordValidate })(ChangePasswordForm);
