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
import {environment} from "../../../environment";

const ForgotPassword = (props) => {
    const {handleSubmit, invalid} = props;
    const onSubmit = async (formValues) => {
        formValues.url = environment.URL + '/#' + Routes.MEMBER_RESET_PASSWORD;
        await apiConfig.post(`send-reset-member-password-link`, formValues)
            .then(response => {
                props.addToast({text: response.data.message});
            })
            .catch(({response}) => {
                    props.addToast({text: response.data.message, type: 'error'});
                }
            );
    };
    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title={'ForgotPassword | LMS System'}/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <h1>Forgot Password</h1>
                                    <p className="text-muted">Forgot password</p>
                                    <Field name="email" type="email" placeholder="Email" groupText="icon-user"
                                           component={CustomInputGroup}/>
                                    <Row>
                                        <Col className="mt-2 d-flex justify-content-between">
                                            <Button color="primary" disabled={invalid} className="px-4">Submit
                                            </Button>
                                            <Link to={Routes.MEMBER_LOGIN}
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

const form = reduxForm({form: 'forgotPasswordForm', validate: loginFormValidate})(ForgotPassword);

export default connect(null, {addToast})(form);
