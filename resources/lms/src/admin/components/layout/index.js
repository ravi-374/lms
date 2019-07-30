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

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    const {permissions} = props;
    const newRoutes = prepareRoutes(permissions);
    useEffect(() => {
        props.fetchConfig();
    }, []);
    if (permissions.length === 0) {
        return null;
    }
    return (
        <div className="app">
            {renderAppHeader(props)}
            <div className="app-body">
                {renderAppSidebar(props, prepareNavigation(permissions))}
                {renderMainSection(newRoutes)}
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
        props.history.push('/app/admin/login');
        localStorage.removeItem('user');
        localStorage.removeItem('authtoken');
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

const renderMainSection = (newRoutes) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(newRoutes)}
                        <Redirect from="/" to="/app/admin/genres"/>
                    </Switch>
                </Suspense>
            </Container>
            <Toasts/>
        </main>
    )
};

const renderRoutes = (newRoutes) => {
    return newRoutes.map((route, index) => {
        return route.component ? (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                    <route.component {...props} />
                )}/>
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

export default connect(mapStateToProps, {fetchConfig})(Layout);
