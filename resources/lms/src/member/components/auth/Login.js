import React, {useEffect, useState} from 'react';
import apiConfig from '../../config/apiConfigWithoutToken';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import CheckBox from '../../../shared/components/CheckBox';
import {addToast} from '../../../store/action/toastAction';
import Toasts from '../../../shared/toast/Toasts';
import {connect} from 'react-redux';
import {Routes, Tokens, LocalStorageKey} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {setUserProfile} from "../../../store/action/localStorageAction";

const Login = (props) => {
    let remember = true;
    const isMemberRemember = localStorage.getItem('is_member_remember');
    if (isMemberRemember !== null && isMemberRemember === 'false') {
        remember = false;
    }
    const [isRemember, setRemember] = useState(remember);
    useEffect(() => {
        if (localStorage.getItem(Tokens.MEMBER)) {
            props.history.push('/');
        }
        if (localStorage.getItem('currentMember')) {
            const member = JSON.parse(atob(localStorage.getItem('currentMember')));
            if (member) {
                props.initialize(member);
            }
        }
    }, []);
    const onRememberChange = () => {
        setRemember(!isRemember);
    };
    const onLogin = async (formValues) => {
        delete formValues.remember_me;
        await apiConfig.post('member-login', formValues).then(response => {
            if (isRemember) {
                localStorage.setItem('currentMember', btoa(JSON.stringify(formValues)));
            } else {
                const user = JSON.parse(atob(localStorage.getItem('currentMember')));
                if (user) {
                    localStorage.removeItem('currentMember');
                }
            }
            localStorage.setItem(Tokens.MEMBER, response.data.data.token);
            localStorage.setItem('is_member_remember', isRemember);
            props.setUserProfile(LocalStorageKey.MEMBER, response.data.data.user);
            if (sessionStorage.getItem('prevMemberPrevUrl')) {
                window.location.href = sessionStorage.getItem('prevMemberPrevUrl');
            } else {
                props.history.push('/');
            }
        }).catch(({ response }) =>
            props.addToast({ text: response.data.message, type: 'error' })
        );
    };
    const { handleSubmit, invalid } = props;
    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title={'Login | LMS System'}/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onLogin)}>
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <Field name="email" type="email" placeholder="Email" groupText="icon-user"
                                           component={CustomInputGroup}/>
                                    <Field name="password" type="password" placeholder="Password" groupText="icon-lock"
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
                                        <Col xs="6" className="text-right mt-2">
                                            <Link to={Routes.MEMBER_FORGOT_PASSWORD} color="link" className="px-0">
                                                Forgot password?
                                            </Link>
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

const form = reduxForm({ form: 'loginForm', validate: loginFormValidate })(Login);

export default connect(null, { addToast, setUserProfile })(form);
