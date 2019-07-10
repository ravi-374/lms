import React from 'react';

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const Users = React.lazy(() => import('./components/users/Users'));
const Books = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/Books'));
const CreateBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/CreateBook'));
const EditBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/EditBook'));
const Genres = React.lazy(() => import('./components/genres/Genres'));
const Tags = React.lazy(() => import('./components/tags/Tags'));
const Authors = React.lazy(() => import('./components/authors/Authors'));
const Publishers = React.lazy(() => import('./components/publishers/Publishers'));
const BookLanguages = React.lazy(() => import('./components/book-languages/BookLanguages'));
const MembershipPlans = React.lazy(() => import('./components/membership-plans/MembershipPlans'));
const BooksSeries = React.lazy(() => import('./components/books-series/BooksSeries'));

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
        path: '/app/books/new',
        exact: true,
        name: 'Add Book',
        component: CreateBook
    },
    {
        path: '/app/books/:id/edit',
        exact: true,
        name: 'Edit Book',
        component: EditBook
    },
    {
        path: '/app/genres',
        exact: true,
        name: 'Genres',
        component: Genres
    },
    {
        path: '/app/tags',
        exact: true,
        name: 'Tags',
        component: Tags
    },
    {
        path: '/app/authors',
        exact: true,
        name: 'Authors',
        component: Authors
    },
    {
        path: '/app/publishers',
        exact: true,
        name: 'Publishers',
        component: Publishers
    },
    {
        path: '/app/book-languages',
        exact: true,
        name: 'BookLanguages',
        component: BookLanguages
    },
    {
        path: '/app/membership-plans',
        exact: true,
        name: 'MembershipPlans',
        component: MembershipPlans

    },
    {
        path: '/app/books-series',
        exact: true,
        name: 'BooksSeries',
        component: BooksSeries

    }
];
