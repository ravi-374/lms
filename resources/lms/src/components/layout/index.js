import React, {Suspense, useState, useEffect} from 'react';
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
import ProgressBar from '../../shared/progress-bar/ProgressBar';
import Toasts from '../../shared/toast/Toasts';
import routes from "../../routes";
import {setLoading} from "../../store/actions/progressBarAction";
import {fetchConfig} from "../../store/actions/configAction";

const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    useEffect(() => {
        props.fetchConfig();
    }, []);
    const [sideMenuList] = useState(prepareNavigation(props));
    return (
        <div className="app">
            {renderAppHeader(props)}
            <div className="app-body">
                {renderAppSidebar(props, sideMenuList)}
                {renderMainSection(props)}
            </div>
            {renderAppFooter()}
        </div>
    );
};

const prepareNavigation = (props) => {
    let sideMenu = navigation;
    let routes = [];
    if (props.permissions.length === 0) {
        return sideMenu;
    }
    sideMenu.items.forEach(route => {
        if (props.permissions.includes(route.permission)) {
            routes.push(route);
        }
    });
    sideMenu.items = routes;
    sideMenu.items = sideMenu.items.slice();
    return sideMenu;
};

const renderAppHeader = (props) => {
    const signOut = (e) => {
        e.preventDefault();
        props.history.push('/app/login');
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

const renderMainSection = (props) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(props)}
                        <Redirect from="/" to="/app/genres"/>
                    </Switch>
                </Suspense>
            </Container>
            <Toasts/>
        </main>
    )
};

const renderRoutes = (props) => {
    let routesArr = routes;
    let filterRoutes = [];
    routesArr.forEach((route) => {
        if (props.permissions.includes(route.permission)) {
            filterRoutes.push(route)
        }
    });

    return filterRoutes.map((route, index) => {
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

export default connect(mapStateToProps, {fetchConfig, setLoading})(Layout);
