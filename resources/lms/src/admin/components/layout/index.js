import React, {Suspense, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
import navigation from '../../config/navbarConfig';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import routes from "../../routes";
import {fetchConfig} from "../../store/actions/configAction";
import {appSettingsKey, LocalStorageKey, Routes, Tokens} from "../../../constants";
import {checkExistingRoute} from "../../../shared/sharedMethod";
import {environment} from "../../../environment";
import {getUserProfile} from "../../../store/action/localStorageAction";
import {fetchAppSetting} from "../../../store/action/appSettingAction";
import {publicImagePath, publicImagePathURL} from "../../../appConstant";

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    const { permissions, getUserProfile, fetchAppSetting, appSetting, user } = props;
    let appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ?
        publicImagePathURL.IMAGE_URL + appSetting[appSettingsKey.LIBRARY_LOGO].value : publicImagePath.APP_LOGO;
    const newRoutes = prepareRoutes(permissions);
    useEffect(() => {
        fetchAppSetting();
        getUserProfile(LocalStorageKey.USER);
        if (!localStorage.getItem(Tokens.ADMIN)) {
            sessionStorage.setItem('prevAdminPrevUrl', window.location.href);
            window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
        } else {
            sessionStorage.removeItem('prevAdminPrevUrl');
            props.fetchConfig();
        }
    }, []);
    if (permissions.length === 0) {
        return null;
    }
    return (
        <div className="app">
            {renderAppHeader(props, appName, appLogo, user)}
            <div className="app-body">
                {renderAppSidebar(props, prepareNavigation(permissions))}
                {renderMainSection(newRoutes, props.location)}
            </div>
            {renderAppFooter(appName)}
        </div>
    );
};

const prepareRoutes = (permissions) => {
    let filterRoutes = [];
    routes.forEach((route) => {
        if (permissions.includes(route.permission)) {
            filterRoutes.push(route)
        }
    });
    return filterRoutes;
};

const prepareNavigation = (permissions) => {
    let sideMenu = navigation;
    let routes = [];
    sideMenu.items.forEach(route => {
        if (permissions.includes(route.permission)) {
            routes.push(route);
        }
    });
    sideMenu.items = routes;
    sideMenu.items = sideMenu.items.slice();
    return navigation;
};

const renderAppHeader = (props, appName, appLogo, user) => {
    const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem(Tokens.ADMIN);
        props.history.push(Routes.ADMIN_LOGIN);
    };
    return (
        <AppHeader fixed>
            <Suspense fallback={<ProgressBar/>}>
                <Header history={props.history} appName={appName} user={user} appLogo={appLogo}
                        onLogout={e => signOut(e)}/>
            </Suspense>
        </AppHeader>
    );
};

const renderAppSidebar = (props, sideMenuList) => {
    return (
        <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
                <AppSidebarNav navConfig={sideMenuList} {...props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
        </AppSidebar>
    );
};

const renderMainSection = (newRoutes, location) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(newRoutes, location)}
                        <Redirect from="/" to={Routes.ADMIN_DEFAULT}/>
                    </Switch>
                </Suspense>
            </Container>
            <Toasts/>
        </main>
    )
};

const renderRoutes = (newRoutes, location) => {
    return newRoutes.map((route, index) => {
        return route.component ? (
            <Route key={index} path={route.path} exact={route.exact} name={route.name} render={props => {
                checkExistingRoute(location, props.history);
                return localStorage.getItem(Tokens.ADMIN) ? <route.component {...props} /> :
                    <Redirect to={Routes.ADMIN_LOGIN}/>
            }}/>
        ) : (null);
    });
};

const renderAppFooter = (appName) => {
    return (
        <AppFooter>
            <Suspense fallback={<ProgressBar/>}>
                <Footer appName={appName}/>
            </Suspense>
        </AppFooter>
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
        permissions, user: profile, appSetting: appSetting
    };
};

export default connect(mapStateToProps, { fetchConfig, getUserProfile, fetchAppSetting })(Layout);
