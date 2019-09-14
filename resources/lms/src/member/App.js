import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ProgressBar from '../shared/progress-bar/ProgressBar';
import {appSettingsKey, LocalStorageKey, Routes} from "../constants";
import {publicImagePath, publicImagePathURL} from "../appConstant";
import {fetchAppSetting} from "../store/action/appSettingAction";
import {getUserProfile} from "../store/action/localStorageAction";
import {fetchConfig} from "../admin/store/actions/configAction";

const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/auth/ResetPassword'));
const Lending = React.lazy(() => import('./components/lending/Lending'));

const App = (props) => {
    const { getUserProfile, fetchAppSetting, appSetting, member } = props;
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;
    const routeProps = { appLogo, appName };

    useEffect(() => {
        fetchAppSetting();
        getUserProfile(LocalStorageKey.MEMBER);
    }, []);

    return (
        <React.Suspense fallback={<ProgressBar/>}>
            <Switch>
                <Route path={Routes.MEMBER_HOME} name="Home" render={props => <Lending {...props}{...routeProps}/>}/>
                <Route path={Routes.MEMBER_LOGIN} name="Login"
                       render={props => <Login {...props} {...props}{...routeProps}/>}/>
                <Route path={Routes.MEMBER_FORGOT_PASSWORD} name="Forgot Password"
                       render={props => <ForgotPassword {...props} {...props}{...routeProps}/>}/>
                <Route path={Routes.MEMBER_RESET_PASSWORD} name="Reset Password"
                       render={props => <ResetPassword {...props}{...props}{...routeProps}/>}/>
                <Route path="/" render={props => <Layout {...props} {...props}{...routeProps} member={member}/>}/>
            </Switch>
        </React.Suspense>
    );
};

const mapStateToProps = (state) => {
    const { profile, appSetting } = state;
    return {
        member: profile, appSetting
    };
};

export default connect(mapStateToProps, { fetchConfig, getUserProfile, fetchAppSetting })(App);
