import React from 'react';
import {Permissions} from "./constants";

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
const BooksSeries = React.lazy(() => import('./components/books-series/BooksSeries'));
const BooksAllotment = React.lazy(() => import('./components/books-allotment/BooksAllotment'));
const BookDetail = React.lazy(() => import('./components/book-detail/BookDetail'));
const MemberDetail = React.lazy(() => import('./components/member-detail/MemberDetail'));
const UserDetail = React.lazy(() => import('./components/user-detail/UserDetail'));
const BookHistoryDetail = React.lazy(() => import('./components/book-history-detail/BookHistoryDetail'));

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
        component: Users,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        component: Books,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/books/new',
        exact: true,
        name: 'Add Book',
        component: CreateBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/books/:id/edit',
        exact: true,
        name: 'Edit Book',
        component: EditBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/genres',
        exact: true,
        name: 'Genres',
        component: Genres,
        permission: Permissions.MANAGE_GENRES
    },
    {
        path: '/app/tags',
        exact: true,
        name: 'Tags',
        component: Tags,
        permission: Permissions.MANAGE_TAGS
    },
    {
        path: '/app/authors',
        exact: true,
        name: 'Authors',
        component: Authors,
        permission: Permissions.MANAGE_AUTHORS
    },
    {
        path: '/app/publishers',
        exact: true,
        name: 'Publishers',
        component: Publishers,
        permission: Permissions.MANAGE_PUBLISHERS
    },
    {
        path: '/app/book-languages',
        exact: true,
        name: 'BookLanguages',
        component: BookLanguages,
        permission: Permissions.MANAGE_BOOK_LANGUAGES
    },
    {
        path: '/app/membership-plans',
        exact: true,
        name: 'MembershipPlans',
        component: MembershipPlans,
        permission: Permissions.MANAGE_PLANS
    },
    {
        path: '/app/members',
        exact: true,
        name: 'Members',
        component: Members,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: '/app/roles',
        exact: true,
        name: 'Roles',
        component: Roles,
        permission: Permissions.MANAGE_ROLES
    },
    {
        path: '/app/books-series',
        exact: true,
        name: 'BooksSeries',
        component: BooksSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/books-allotment',
        exact: true,
        name: 'BooksAllotment',
        component: BooksAllotment,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/books/:id/detail',
        exact: true,
        name: 'BookDetail',
        component: BookDetail,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/members/:id/detail',
        exact: true,
        name: 'MemberDetail',
        component: MemberDetail,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: '/app/users/:id/detail',
        exact: true,
        name: 'UserDetail',
        component: UserDetail,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/book-history/:id/detail',
        exact: true,
        name: 'BookHistoryDetail',
        component: BookHistoryDetail,
        permission: Permissions.MANAGE_BOOKS
    }
];
