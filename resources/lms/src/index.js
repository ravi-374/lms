import React from 'react';
import ReactDOM from 'react-dom';
import MemberApp from './member/App';
import AdminApp from './admin/App';
import {routePath} from './appConstant';

if (window.location.hash.startsWith(routePath.ADMIN_ROUTE_PATH)) {
    ReactDOM.render(<AdminApp/>, document.getElementById('root'));
} else {
    ReactDOM.render(<MemberApp/>, document.getElementById('root'));
}
