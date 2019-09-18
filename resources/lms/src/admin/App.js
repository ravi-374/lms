import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import ProgressBar from '../shared/progress-bar/ProgressBar';
import {appSettingsKey, LocalStorageKey, Routes} from "../constants";
import {fetchAppSetting} from "../store/action/appSettingAction";
import {connect} from "react-redux";
import {getUserProfile} from "../store/action/localStorageAction";
import {fetchConfig} from "./store/actions/configAction";
import {publicImagePath, publicImagePathURL} from "../appConstant";

const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));

const App = (props) => {
    const { permissions, getUserProfile, fetchAppSetting, fetchConfig, appSetting, user } = props;
    let appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;
    const routeProps = { appLogo, appName };

    useEffect(() => {
        fetchAppSetting();
        fetchConfig();
        getUserProfile(LocalStorageKey.USER);
    }, []);

    return (
        <React.Suspense fallback={<ProgressBar/>}>
            <Switch>
                <Route path={Routes.ADMIN_LOGIN} name="Login" render={props => <Login {...props} {...routeProps}/>}/>
                <Route path={Routes.ADMIN_FORGOT_PASSWORD} name="Forgot Password"
                       render={props => <ForgotPassword {...props} {...routeProps}/>}/>
                <Route path={Routes.ADMIN_RESET_PASSWORD} name="Reset Password"
                       render={props => <ResetPassword {...props} {...routeProps}/>}/>
                <Route path="/app/admin" name="Home"
                       render={props => <Layout {...props} {...routeProps} permissions={permissions} user={user}/>}/>
            </Switch>
        </React.Suspense>
    );
};

const mapStateToProps = (state) => {
    const permissions = [];
    const { profile, appSetting, config } = state;
    if (config.permissions) {
        config.permissions.forEach((permission) =>
            permissions.push(permission.name)
        );
    }
    return {
        permissions, user: profile, appSetting
    };
};

export default connect(mapStateToProps, { fetchConfig, getUserProfile, fetchAppSetting })(App);
