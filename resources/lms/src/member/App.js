import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import ProgressBar from '../shared/progress-bar/ProgressBar';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './store/reducers';
import {Routes} from "../constants";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <React.Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        <Route path={Routes.MEMBER_LOGIN} name="Login" render={props => <Login {...props}/>}/>
                        <Route path={Routes.MEMBER_FORGOT_PASSWORD} name="Forgot Password" render={props => <ForgotPassword {...props}/>}/>
                        <Route path={Routes.MEMBER_RESET_PASSWORD} name="Reset Password" render={props => <ResetPassword {...props}/>}/>
                        <Route path="/" name="Home" render={props => <Layout {...props}/>}/>
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </Provider>
    );
};

export default App;
