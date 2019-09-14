import React, {Suspense, useEffect} from 'react';
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
import routes from '../../routes';
import {Routes, Tokens} from "../../../constants";
import {checkExistingRoute} from "../../../shared/sharedMethod";

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    const { appName, appLogo, member } = props;

    return (
        <div className="app">
            {renderAppHeader(props, appName, appLogo, member)}
            <div className="app-body">
                {renderAppSidebar(props)}
                {renderMainSection(props.location, appName, appLogo)}
            </div>
            {renderAppFooter(appName)}
        </div>
    );
};

const renderAppHeader = (props, appName, appLogo, member) => {
    const signOut = (e) => {
        e.preventDefault();
        props.history.push(Routes.MEMBER_HOME);
        localStorage.removeItem('member');
        localStorage.removeItem(Tokens.MEMBER);
    };
    return (
        <AppHeader fixed>
            <Suspense fallback={<ProgressBar/>}>
                <Header history={props.history} appName={appName} member={member} appLogo={appLogo}
                        onLogout={e => signOut(e)}/>
            </Suspense>
        </AppHeader>
    );
};

const renderAppSidebar = (props) => {
    return (
        <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
                <AppSidebarNav navConfig={navigation} {...props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
        </AppSidebar>
    );
};

const renderMainSection = (location, appName, appLogo) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(location, appName, appLogo)}
                        <Redirect from="/" to={Routes.MEMBER_DEFAULT}/>
                    </Switch>
                </Suspense>
            </Container>
            <Toasts/>
        </main>
    )
};

const renderRoutes = (location, appName, appLogo) => {
    if (!localStorage.getItem(Tokens.MEMBER)) {
        sessionStorage.setItem('prevMemberPrevUrl', window.location.href)
    } else {
        sessionStorage.removeItem('prevMemberPrevUrl')
    }
    return routes.map((route, index) => {
        return route.component ? (
            <Route key={index} path={route.path} exact={route.exact} name={route.name} render={props => {
                checkExistingRoute(location, props.history);
                return localStorage.getItem(Tokens.MEMBER) ?
                    <route.component {...props} appName={appName} appLogo={appLogo}/> :
                    <Redirect to={Routes.MEMBER_HOME}/>
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

export default Layout;
