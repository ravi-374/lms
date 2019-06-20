import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const Users = React.lazy(() => import('./components/users/Users'));
const Books = React.lazy(() => import('./components/books/Books'));
const Genres = React.lazy(() => import('./components/genres/Genres'));

export default [
    {
        path: '/app/dashboard',
        exact: true,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/app/users',
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
    {
        path: '/app/genres',
        exact: true,
        name: 'Genres',
        component: Genres
    },
];
