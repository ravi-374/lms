import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.scss';

const Layout = React.lazy(() => import('./components/layout/index'));


const App = () => {
    return (
        <HashRouter>
            <Switch>
                <React.Suspense fallback={<div>Loading..</div>}>
                    <Route path="/" name="Home" render={props => <Layout {...props}/>}/>
                </React.Suspense>
            </Switch>
        </HashRouter>
    );
};

export default App;
