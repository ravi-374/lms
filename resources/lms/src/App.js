import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import ProgressBar from './shared/progress-bar/ProgressBar';
import {connect} from "react-redux";
import {fetchConfig} from "./store/actions/configAction";
import {setLoading} from './store/actions/progressBarAction';

const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));

const App = (props) => {
    const {permissions} = props;
    useEffect(() => {
        props.fetchConfig();
    }, []);

    if (permissions.length === 0) {
        props.setLoading(true);
        return <ProgressBar/>;
    }

    return (
        <HashRouter>
            <React.Suspense fallback={<ProgressBar/>}>
                <Switch>
                    <Route path="/app/login" name="Home" render={props => <Login {...props}/>}/>
                    <Route path="/" name="Home" render={props => <Layout {...props} permissions={permissions}/>}/>
                </Switch>
            </React.Suspense>
        </HashRouter>
    );
};

const mapStateToProps = (state) => {
    const permissions = [];
    if (state.config.permissions) {
        state.config.permissions.forEach((permission) => {
            permissions.push(permission.name)
        });
    }
    return {
        permissions
    }
};

export default connect(mapStateToProps, {fetchConfig, setLoading})(App);
