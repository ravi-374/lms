import React from 'react';

const Books = React.lazy(() => import('./components/books/Books'));
const MemberProfile = React.lazy(() => import('./components/member-profile/MemberProfile'));
const BookHistory = React.lazy(() => import('./components/book-history/BookHistory'));
export default [
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        component: Books
    },
    {
        path: '/app/book-history',
        exact: true,
        name: 'Book History',
        component: BookHistory
    },
    {
        path: '/app/member-profile',
        exact: true,
        name: 'MemberProfile',
        component: MemberProfile
    }
];
