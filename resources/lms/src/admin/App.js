import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import ProgressBar from '../shared/progress-bar/ProgressBar';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './store/reducers';
import {Routes} from "../constants";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const Layout = React.lazy(() => import('./components/layout/index'));
const Login = React.lazy(() => import('./components/auth/Login'));

const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <React.Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        <Route path={Routes.ADMIN_LOGIN} name="Home" render={props => <Login {...props}/>}/>
                        <Route path="/app/admin" name="Home" render={props => <Layout {...props}/>}/>
                    </Switch>
                </React.Suspense>
            </HashRouter>
        </Provider>
    );
};

export default App;
