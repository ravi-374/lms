import {Permissions} from '../constants';

export default {
    items: [
        {
            name: 'Books',
            url: '/app/admin/books',
            icon: 'icon-book-open',
            permission: Permissions.MANAGE_BOOKS,
        },
        {
            name: 'Users',
            url: '/app/admin/users',
            icon: 'icon-user',
            permission: Permissions.MANAGE_USERS,
        },
        {
            name: 'Genres',
            url: '/app/admin/genres',
            icon: 'icon-layers',
            permission: Permissions.MANAGE_GENRES,
        },
        {
            name: 'Authors',
            url: '/app/admin/authors',
            icon: 'icon-briefcase',
            permission: Permissions.MANAGE_AUTHORS,
        },
        {
            name: 'Publishers',
            url: '/app/admin/publishers',
            icon: 'icon-envelope-open',
            permission: Permissions.MANAGE_PUBLISHERS,
        },
        {
            name: 'Book Languages',
            url: '/app/admin/book-languages',
            icon: 'icon-note',
            permission: Permissions.MANAGE_BOOK_LANGUAGES,
        },
        {
            name: 'Tags',
            url: '/app/admin/tags',
            icon: 'icon-tag',
            permission: Permissions.MANAGE_TAGS,
        },
        {
            name: 'Roles',
            url: '/app/admin/roles',
            icon: 'icon-grid',
            permission: Permissions.MANAGE_ROLES,
        },
        {
            name: 'Membership Plans',
            url: '/app/admin/membership-plans',
            icon: 'icon-briefcase',
            permission: Permissions.MANAGE_PLANS,
        },
        {
            name: 'Books Series',
            url: '/app/admin/books-series',
            icon: 'icon-grid',
            permission: Permissions.MANAGE_BOOK_SERIES,
        },
        {
            name: 'Members',
            url: '/app/admin/members',
            icon: 'icon-user',
            permission: Permissions.MANAGE_MEMBERS,
        },
        {
            name: 'Books Allotment',
            url: '/app/admin/books-allotment',
            icon: 'icon-book-open',
            permission: Permissions.MANAGE_BOOKS
        },
        {
            name: 'Settings',
            url: '/app/admin/settings',
            icon: 'icon-settings',
            permission: Permissions.MANAGE_FINANCE,
        }
    ],
};
