import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import apiConfig from '../../config/apiConfigwithoutTokenWithRoot';
import {environment} from "../../../environment";
import {Routes} from "../../../constants";
import Toasts from '../../../shared/toast/Toasts';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {addToast} from '../../../store/action/toastAction';

const MemberForgotPassword = (props) => {
    const { handleSubmit, invalid, addToast } = props;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const onSubmit = async (formValues) => {
        formValues.url = environment.URL + '/#' + Routes.MEMBER_RESET_PASSWORD;
        await apiConfig.post(`send-reset-member-password-link`, formValues)
            .then(response => {
                addToast({ text: response.data.message });
                setIsFormSubmitted(true);
            })
            .catch(({ response }) => {
                    addToast({ text: response.data.message, type: 'error' });
                }
            );
    };

    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Forgot Password"/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                {!isFormSubmitted ?
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <h1>{getFormattedMessage('forgot-password.title')}</h1>
                                        <p className="text-muted">{getFormattedMessage('forgot-password.note')}</p>
                                        <Field name="email" type="email" placeholder="profile.input.email.label"
                                               groupText="icon-user" component={CustomInputGroup}/>
                                        <Row>
                                            <Col className="mt-2 d-flex justify-content-end">
                                                <Button color="primary" disabled={invalid} className="px-4">
                                                    {getFormattedMessage('global.input.submit-btn.label')}
                                                </Button>
                                                <Link to={Routes.MEMBER_LOGIN} className="btn btn-secondary ml-2">
                                                    {getFormattedMessage('global.input.cancel-btn.label')}
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Form> :
                                    <div>
                                        <div className="text-center">
                                            <p>{getFormattedMessage('forgot-password.email.note')}</p>
                                            <Link to={Routes.MEMBER_LOGIN} color="link">
                                                {getFormattedMessage('forgot-password.link.go-back.title')}
                                            </Link>
                                        </div>
                                    </div>
                                }
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


MemberForgotPassword.propTypes = {
    invalid: PropTypes.bool,
    addToast: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const form = reduxForm({ form: 'forgotPasswordForm', validate: loginFormValidate })(MemberForgotPassword);

export default connect(null, { addToast })(form);
