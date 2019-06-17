import React from 'react';
//import Users from "./components/users/Users";
//import Books from "./components/books/Books";

const Users = React.lazy(() => import('./components/users/Users'));
const Books = React.lazy(() => import('./components/books/Books'));
const routes = [
    {
        path: '/app/users/',
        exact: true,
        name: 'Users',
        component: Users
    },
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        component: Books
    },
];

export default routes;
