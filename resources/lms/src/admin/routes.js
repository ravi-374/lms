import React from 'react';
import {Permissions} from './constants';

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
const Roles = React.lazy(() => import('./components/roles/Roles'));
const Members = React.lazy(() => import('./components/members/Members'));
const BooksSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/BooksSeries'));
const CreateBookSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/CreateBookSeries'));
const EditBookSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/EditBookSeries'));
const BooksAllotment = React.lazy(() => import('./components/books-allotment/BooksAllotment'));
const BookDetail = React.lazy(() => import('./components/book-detail/BookDetail'));
const MemberDetail = React.lazy(() => import('./components/member-detail/MemberDetail'));
const UserDetail = React.lazy(() => import('./components/user-detail/UserDetail'));
const BookHistoryDetail = React.lazy(() => import('./components/book-history-detail/BookHistoryDetail'));

export default [
    {
        path: '/app/admin/dashboard',
        exact: true,
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/app/admin/users',
        exact: true,
        name: 'Users',
        component: Users,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: '/app/admin/books',
        exact: true,
        name: 'Books',
        component: Books,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/books/new',
        exact: true,
        name: 'Add Book',
        component: CreateBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/books/:id/edit',
        exact: true,
        name: 'Edit Book',
        component: EditBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/genres',
        exact: true,
        name: 'Genres',
        component: Genres,
        permission: Permissions.MANAGE_GENRES
    },
    {
        path: '/app/admin/tags',
        exact: true,
        name: 'Tags',
        component: Tags,
        permission: Permissions.MANAGE_TAGS
    },
    {
        path: '/app/admin/authors',
        exact: true,
        name: 'Authors',
        component: Authors,
        permission: Permissions.MANAGE_AUTHORS
    },
    {
        path: '/app/admin/publishers',
        exact: true,
        name: 'Publishers',
        component: Publishers,
        permission: Permissions.MANAGE_PUBLISHERS
    },
    {
        path: '/app/admin/book-languages',
        exact: true,
        name: 'BookLanguages',
        component: BookLanguages,
        permission: Permissions.MANAGE_BOOK_LANGUAGES
    },
    {
        path: '/app/admin/membership-plans',
        exact: true,
        name: 'MembershipPlans',
        component: MembershipPlans,
        permission: Permissions.MANAGE_PLANS
    },
    {
        path: '/app/admin/members',
        exact: true,
        name: 'Members',
        component: Members,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: '/app/admin/roles',
        exact: true,
        name: 'Roles',
        component: Roles,
        permission: Permissions.MANAGE_ROLES
    },
    {
        path: '/app/admin/books-series',
        exact: true,
        name: 'BooksSeries',
        component: BooksSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/admin/books-series/new',
        exact: true,
        name: 'CreateSeriesBook',
        component: CreateBookSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/admin/books-series/:id/edit',
        exact: true,
        name: 'EditSeriesBook',
        component: EditBookSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/admin/books-allotment',
        exact: true,
        name: 'BooksAllotment',
        component: BooksAllotment,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/books/:id/detail',
        exact: true,
        name: 'BookDetail',
        component: BookDetail,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/members/:id/detail',
        exact: true,
        name: 'MemberDetail',
        component: MemberDetail,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: '/app/admin/users/:id/detail',
        exact: true,
        name: 'UserDetail',
        component: UserDetail,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/book-history/:id/detail',
        exact: true,
        name: 'BookHistoryDetail',
        component: BookHistoryDetail,
        permission: Permissions.MANAGE_BOOKS
    }
];
