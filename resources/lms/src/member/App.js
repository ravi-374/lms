import React, {useEffect, lazy} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import LocaleData from './locales';
import {fetchSettings} from "./store/actions/settingAction";
import {settingsKey} from "./constants";
import {appSettingsKey, LocalStorageKey, Routes} from "../constants";
import {publicImagePath, publicImagePathURL} from "../appConstant";
import ProgressBar from '../shared/progress-bar/ProgressBar';
import Toasts from '../shared/toast/Toasts';
import {addRTLSupport} from "../shared/sharedMethod";
import {fetchAppSetting} from "../store/action/appSettingAction";
import {getUserProfile} from "../store/action/localStorageAction";

const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./components/auth/Login'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const Home = lazy(() => import('./components/home/Home'));

const MemberApp = (props) => {
    const { getUserProfile, fetchSettings, settings, fetchAppSetting, appSetting, member } = props;
    const messages = settings[settingsKey.LANGUAGE] ? LocaleData[settings[settingsKey.LANGUAGE].value]
        : LocaleData[settingsKey.DEFAULT_LOCALE];
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;
    const routeProps = { appLogo, appName, member };
    addRTLSupport(settings[settingsKey.LANGUAGE] ? settings[settingsKey.LANGUAGE].value : settingsKey.DEFAULT_LOCALE);

    useEffect(() => {
        fetchAppSetting();
        fetchSettings();
        getUserProfile(LocalStorageKey.MEMBER);
    }, []);

    return (
        <IntlProvider locale={settingsKey.DEFAULT_LOCALE} messages={messages}>
            <React.Suspense fallback={<ProgressBar/>}>
                <Switch>
                    {/*<Route exact={true} path={Routes.APP_HOME} name="Home" render={props => <Home {...props}/>}/>*/}
                    <Route path={Routes.MEMBER_HOME} name="home" exact render={props => <Home {...props}/>}/>
                    <Route path={Routes.MEMBER_LOGIN} name="Login" exact render={props => <Login {...props}/>}/>
                    <Route path={Routes.MEMBER_FORGOT_PASSWORD} name="Forgot Password" exact
                           render={props => <ForgotPassword {...props}/>}/>
                    <Route path={Routes.MEMBER_RESET_PASSWORD} name="Reset Password" exact
                           render={props => <ResetPassword {...props}/>}/>
                    <Route path="/app" render={props => <Layout {...props} {...routeProps}/>}/>
                    <Redirect from="*" to="/app"/>
                </Switch>
                <Toasts language={settings[settingsKey.LANGUAGE] ? settings[settingsKey.LANGUAGE].value : null}/>
            </React.Suspense>
        </IntlProvider>
    );
};

MemberApp.propTypes = {
    member: PropTypes.object,
    appSetting: PropTypes.object,
    settings: PropTypes.object,
    fetchSettings: PropTypes.func,
    getUserProfile: PropTypes.func,
    fetchAppSetting: PropTypes.func,
    sortAction: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { profile, appSetting, settings } = state;
    return {
        member: profile, appSetting, settings
    };
};

export default connect(mapStateToProps, { fetchSettings, getUserProfile, fetchAppSetting })(MemberApp);
