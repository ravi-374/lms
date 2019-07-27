import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const BookHistory = React.lazy(() => import('./components/book-history/BookHistory'));
export default [
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        component: Dashboard
    },
    {
        path: '/app/book-history',
        exact: true,
        name: 'Book History',
        component: BookHistory
    },
    {
        path: '/app/profile',
        exact: true,
        name: 'Profile',
        component: Dashboard
    },
];
