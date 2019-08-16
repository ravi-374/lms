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
import {Routes, Tokens} from "../../../constants";
import {checkExistingRoute} from "../../../shared/sharedMethod";
import {environment} from "../../../environment";

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    const { permissions } = props;
    const newRoutes = prepareRoutes(permissions);
    useEffect(() => {
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
            {renderAppHeader(props)}
            <div className="app-body">
                {renderAppSidebar(props, prepareNavigation(permissions))}
                {renderMainSection(newRoutes, props.location)}
            </div>
            {renderAppFooter()}
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

const renderAppHeader = (props) => {
    const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem(Tokens.ADMIN);
        props.history.push(Routes.ADMIN_LOGIN);
    };
    return (
        <AppHeader fixed>
            <Suspense fallback={<ProgressBar/>}>
                <Header history={props.history} onLogout={e => signOut(e)}/>
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

const renderAppFooter = () => {
    return (
        <AppFooter>
            <Suspense fallback={<ProgressBar/>}>
                <Footer/>
            </Suspense>
        </AppFooter>
    );
};

const mapStateToProps = (state) => {
    const permissions = [];
    if (state.config.permissions) {
        state.config.permissions.forEach((permission) =>
            permissions.push(permission.name)
        );
    }
    return {
        permissions
    };
};

export default connect(mapStateToProps, { fetchConfig })(Layout);
