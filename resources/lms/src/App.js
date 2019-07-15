import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import ProgressBar from './shared/progress-bar/ProgressBar';

const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));

const App = () => {
    return (
        <HashRouter>
            <React.Suspense fallback={<ProgressBar/>}>
                <Switch>
                    <Route path="/app/login" name="Home" render={props => <Login {...props}/>}/>
                    <Route path="/" name="Home" render={props => <Layout {...props}/>}/>
                </Switch>
            </React.Suspense>
        </HashRouter>
    );
};

export default App;
