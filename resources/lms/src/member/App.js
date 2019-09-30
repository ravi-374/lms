import React, {useEffect, lazy} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ProgressBar from '../shared/progress-bar/ProgressBar';
import {IntlProvider} from 'react-intl';
import LocaleData from './locales';
import {fetchSettings} from "./store/actions/settingAction";
import {settingsKey} from "./constants";
import {appSettingsKey, LocalStorageKey, Routes} from "../constants";
import {publicImagePath, publicImagePathURL} from "../appConstant";
import {fetchAppSetting} from "../store/action/appSettingAction";
import {getUserProfile} from "../store/action/localStorageAction";
import {fetchConfig} from "../admin/store/actions/configAction";
import {addRTLSupport} from "../shared/sharedMethod";

const Layout = lazy(() => import('./components/layout'));
const Login = lazy(() => import('./components/auth/Login'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const Lending = lazy(() => import('./components/lending/Lending'));

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
                    <Route path={Routes.MEMBER_HOME} name="Home" render={props => <Lending {...props}/>}/>
                    <Route path={Routes.MEMBER_LOGIN} name="Login" render={props => <Login {...props}/>}/>
                    <Route path={Routes.MEMBER_FORGOT_PASSWORD} name="Forgot Password"
                           render={props => <ForgotPassword {...props}/>}/>
                    <Route path={Routes.MEMBER_RESET_PASSWORD} name="Reset Password"
                           render={props => <ResetPassword {...props}/>}/>
                    <Route path="/" render={props => <Layout {...props} {...routeProps}/>}/>
                </Switch>
            </React.Suspense>
        </IntlProvider>
    );
};

MemberApp.propTypes = {
    member:PropTypes.object,
    appSetting: PropTypes.object,
    settings: PropTypes.object,
    fetchSettings: PropTypes.func,
    fetchConfig: PropTypes.func,
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

export default connect(mapStateToProps, { fetchSettings, fetchConfig, getUserProfile, fetchAppSetting })(MemberApp);
