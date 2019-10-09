import React, {lazy} from 'react';

const Books = lazy(() => import('./components/book-search/BookSearch'));
const MemberProfile = lazy(() => import('./components/member-profile/MemberProfile'));
const BookHistory = lazy(() => import('./components/book-history/BookHistory'));

export default [
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        title: 'app.navigation.books',
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
