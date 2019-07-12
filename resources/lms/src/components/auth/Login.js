import React, {useEffect, useState} from 'react';
import apiConfig from '../../config/apiConfigWithoutToken';
import {Field, reduxForm} from 'redux-form';
import CustomInputGroup from '../../shared/components/CustomInputGroup';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import CheckBox from '../../shared/components/CheckBox';
import {addToast} from '../../store/actions/toastAction';
import Toasts from '../../shared/toast/Toasts';
import {connect} from 'react-redux';

const Login = (props) => {
    const [isRemember, setRemember] = useState(true);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            props.initialize(user);
        }
    }, []);
    const onRememberChange = () => {
        setRemember(!isRemember);
    };
    const onLogin = async (formValues) => {
        delete formValues.remember_me;
        await apiConfig.post('login', formValues).then(response => {
            if (isRemember) {
                localStorage.setItem('currentUser', JSON.stringify(formValues));
            } else {
                const user = JSON.parse(localStorage.getItem('currentUser'));
                if (user) {
                    localStorage.removeItem('currentUser');
                }
            }
            localStorage.setItem('authtoken', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            props.history.push('/');
        }).catch(({response}) =>
            props.addToast({text: response.data.message, type: 'error'})
        );
    };
    const {handleSubmit, invalid} = props;
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onLogin)}>
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>

                                    <Field name="email" type="email" groupText="icon-user"
                                           component={CustomInputGroup}/>
                                    <Field name="password" type="password" groupText="icon-lock"
                                           component={CustomInputGroup}/>
                                    <div>
                                        <Field name="remember_me" checked={isRemember} onChange={onRememberChange}
                                               label="Remember Me" component={CheckBox}/>
                                    </div>
                                    <Row>
                                        <Col xs="6">
                                            <Button color="primary" disabled={invalid} className="px-4">Login
                                            </Button>
                                        </Col>
                                        <Col xs="6" className="text-right">
                                            <Button color="link" className="px-0">Forgot password?</Button>
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

const form = reduxForm({form: 'loginForm', validate: loginFormValidate})(Login);

export default connect(null, {addToast})(form);
