import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import apiConfig from '../../config/apiConfigWithoutToken';
import {LocalStorageKey, Routes, Tokens} from "../../../constants";
import CheckBox from '../../../shared/components/CheckBox';
import Toasts from '../../../shared/toast/Toasts';
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {setUserProfile} from "../../../store/action/localStorageAction";
import {addToast} from '../../../store/action/toastAction';

const MemberLogin = (props) => {
    const { handleSubmit, invalid, history, initialize, setUserProfile, addToast } = props;
    let remember = true;
    const isMemberRemember = localStorage.getItem('is_member_remember');
    if (isMemberRemember !== null && isMemberRemember === 'false') {
        remember = false;
    }
    const [isRemember, setRemember] = useState(remember);

    useEffect(() => {
        if (localStorage.getItem(Tokens.MEMBER)) {
            history.push('/');
        }
        if (localStorage.getItem('currentMember')) {
            const member = JSON.parse(atob(localStorage.getItem('currentMember')));
            if (member) {
                initialize(member);
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
            setUserProfile(LocalStorageKey.MEMBER, response.data.data.user);
            if (sessionStorage.getItem('prevMemberPrevUrl')) {
                window.location.href = sessionStorage.getItem('prevMemberPrevUrl');
            } else {
                history.push('/');
            }
        }).catch(({ response }) =>
            addToast({ text: response.data.message, type: 'error' })
        );
    };
    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Login"/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onLogin)}>
                                    <h1>{getFormattedMessage('login.title')}</h1>
                                    <p className="text-muted">{getFormattedMessage('login.note')}</p>
                                    <Field name="email" type="email" placeholder="profile.input.email.label"
                                           groupText="icon-user" component={CustomInputGroup}/>
                                    <Field name="password" type="password" placeholder="profile.input.password.label"
                                           groupText="icon-lock" component={CustomInputGroup}/>
                                    <div>
                                        <Field name="remember_me" checked={isRemember} onChange={onRememberChange}
                                               label={getFormattedMessage('login.checkbox.remember.label')}
                                               component={CheckBox}/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button color="primary" disabled={invalid} className="px-4">
                                            {getFormattedMessage('login.title')}
                                        </Button>
                                        <Link to={Routes.MEMBER_FORGOT_PASSWORD} color="link"
                                              className="px-0 mt-2 text-right">
                                            {getFormattedMessage('login.link.forgot-password.title')}
                                        </Link>
                                    </div>
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

MemberLogin.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    invalid: PropTypes.bool,
    initialize: PropTypes.func,
    addToast: PropTypes.func,
    handleSubmit: PropTypes.func,
    setUserProfile: PropTypes.func
};

const form = reduxForm({ form: 'loginForm', validate: loginFormValidate })(MemberLogin);

export default connect(null, { addToast, setUserProfile })(form);
