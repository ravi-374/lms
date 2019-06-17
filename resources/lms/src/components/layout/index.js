import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import routes from '../../routes';
import {
    AppBreadcrumb,
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
//import ProgressBar from '../shared/progress-bar/ProgressBar';
//import Toasts from '../shared/toast/Toasts';
const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));

const Layout = (props) => {
    return (
        <div className="app">
            {renderAppHeader(props)}
            <div className="app-body">
                {renderAppSidebar(props)}
                {renderMainSection()}
            </div>
            {renderAppFooter()}
        </div>
    );
};

const renderAppHeader = (props) => {
    const signOut = (e) => {
        e.preventDefault();
        props.history.push('/app/login');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    return (
        <AppHeader fixed>
            <Header history={props.history} onLogout={e => signOut(e)}/>
        </AppHeader>
    );
};

const renderAppSidebar = (props) => {
    return (
        <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <AppSidebarNav navConfig={navigation} {...props} />
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
        </AppSidebar>
    );
};

const renderMainSection = () => {
    return (
        <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
                <Switch>
                    {renderRoutes()}
                    <Redirect from="/" to="/app/dashboard"/>
                </Switch>
            </Container>
        </main>
    )
};

const renderRoutes = () => {
    return routes.map((route, index) => {
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
            <Footer/>
        </AppFooter>
    );
};

export default Layout;
