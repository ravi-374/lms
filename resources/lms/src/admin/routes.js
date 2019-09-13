import React from 'react';
import {Permissions} from './constants';
import {Routes} from "../constants";

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const Users = React.lazy(() => import('./components/users/Users'));
const Books = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/Books'));
const CreateBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/CreateBook'));
const ImportBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/import-book/ImportBook'));
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
const BookDetails = React.lazy(() => import('./components/book-details/BookDetails'));
const MemberDetails = React.lazy(() => import('./components/member-details/MemberDetails'));
const UserDetails = React.lazy(() => import('./components/user-details/UserDetails'));
const BookAllotmentDetails = React.lazy(() => import('./components/book-allotment-details/BookAllotmentDetails'));
const UserProfile = React.lazy(() => import('./components/user-profile/UserProfile'));
const Settings = React.lazy(() => import('./components/settings/Settings'));

export default [
    {
        path: Routes.USERS,
        exact: true,
        name: 'Users',
        component: Users,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: `${Routes.USERS}:id/details`,
        exact: true,
        name: 'UserDetails',
        component: UserDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: Routes.BOOKS,
        exact: true,
        name: 'Books',
        component: Books,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}new`,
        exact: true,
        name: 'Add Book',
        component: CreateBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}:id/details`,
        exact: true,
        name: 'BookDetails',
        component: BookDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}import-book`,
        exact: true,
        name: 'Import Book',
        component: ImportBook,
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
        path: Routes.MEMBERS,
        exact: true,
        name: 'Members',
        component: Members,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: `${Routes.MEMBERS}:id/details`,
        exact: true,
        name: 'MemberDetail',
        component: MemberDetails,
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
        path: Routes.BOOK_ALLOTMENTS,
        exact: true,
        name: 'BooksAllotment',
        component: BooksAllotment,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOK_ALLOTMENTS}:id/details`,
        exact: true,
        name: 'BookAllotmentDetails',
        component: BookAllotmentDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/user-profile',
        exact: true,
        name: 'UserProfile',
        component: UserProfile,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: '/app/admin/settings',
        exact: true,
        name: 'Settings',
        component: Settings,
        permission: Permissions.MANAGE_FINANCE
    }
];
