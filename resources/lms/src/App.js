import React, {Component} from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import MemberApp from './member/App';
import AdminApp from './admin/App';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/app/admin" name="Admin Home" render={props => <AdminApp {...props}/>}/>
                <Route path="/app" name="Member Home" render={props => <MemberApp {...props}/>}/>
                <Redirect from="*" to="/app" exact={true}/>
            </Switch>
        </HashRouter>
    );
};

export default App;
