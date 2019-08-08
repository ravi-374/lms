import React, {} from 'react';
import apiConfig from '../../config/apiConfigwithoutTokenWithRoot';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import {addToast} from '../../../store/action/toastAction';
import Toasts from '../../../shared/toast/Toasts';
import {connect} from 'react-redux';
import {Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const ResetPassword = (props) => {
    const params = new URLSearchParams(props.location.search);
    const {handleSubmit, invalid} = props;
    const onSubmit = async (formValues) => {
        delete formValues.confirm_password;
        formValues.token = params.get('token');
        await apiConfig.post(`reset-password`, formValues)
            .then(response => {
                props.addToast({text: response.data.message});
                props.history.push(Routes.ADMIN_LOGIN);
            })
            .catch(({response}) => {
                    props.addToast({text: response.data.message, type: 'error'});
                }
            );
    };
    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title={'ResetPassword | LMS System'}/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <h1>Reset Password</h1>
                                    <p className="text-muted">Reset password</p>
                                    <Field name="password" type="password" placeholder="Password" groupText="icon-lock"
                                           component={CustomInputGroup}/>
                                    <Field name="confirm_password" type="password" placeholder="Repeat Password"
                                           groupText="icon-lock"
                                           component={CustomInputGroup}/>
                                    <Row>
                                        <Col className="mt-2 d-flex justify-content-between">
                                            <Button color="primary" disabled={invalid} className="px-4">Submit
                                            </Button>
                                            <Link to={Routes.ADMIN_FORGOT_PASSWORD}
                                                  className="btn btn-secondary ml-2">Back</Link>
                                        </Col>
                                    </Row>
                                </Form>
                                <Toasts/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const form = reduxForm({form: 'resetPasswordForm', validate: loginFormValidate})(ResetPassword);

export default connect(null, {addToast})(form);
