import {Permissions} from '../constants';

export default {
    items: [
        {
            name: 'Books',
            url: '/app/admin/books',
            icon: 'fa fa-book',
            permission: Permissions.MANAGE_BOOKS,
        },
        {
            name: 'Books Allotment',
            url: '/app/admin/books-allotment',
            icon: 'fas fa-book-reader',
            permission: Permissions.MANAGE_BOOKS
        },
        {
            name: 'Members',
            url: '/app/admin/members',
            icon: 'fas fa-users',
            permission: Permissions.MANAGE_MEMBERS,
        },
        {
            name: 'Genres',
            url: '/app/admin/genres',
            icon: 'fas fa-layer-group',
            permission: Permissions.MANAGE_GENRES,
        },
        {
            name: 'Authors',
            url: '/app/admin/authors',
            icon: 'fas fa-user-friends',
            permission: Permissions.MANAGE_AUTHORS,
        },
        {
            name: 'Publishers',
            url: '/app/admin/publishers',
            icon: 'fas fa-atlas',
            permission: Permissions.MANAGE_PUBLISHERS,
        },
        {
            name: 'Book Languages',
            url: '/app/admin/book-languages',
            icon: 'fa fa-globe',
            permission: Permissions.MANAGE_BOOK_LANGUAGES,
        },
        {
            name: 'Tags',
            url: '/app/admin/tags',
            icon: 'fas fa-tags',
            permission: Permissions.MANAGE_TAGS,
        },
        {
            name: 'Users',
            url: '/app/admin/users',
            icon: 'fa fa-user',
            permission: Permissions.MANAGE_USERS,
        },
        {
            name: 'Roles',
            url: '/app/admin/roles',
            icon: 'fas fa-user-shield',
            permission: Permissions.MANAGE_ROLES,
        },
        {
            name: 'Membership Plans',
            url: '/app/admin/membership-plans',
            icon: 'icon-docs',
            permission: Permissions.MANAGE_PLANS,
        },
        {
            name: 'Books Series',
            url: '/app/admin/books-series',
            icon: 'fas fa-swatchbook',
            permission: Permissions.MANAGE_BOOK_SERIES,
        },
        {
            name: 'Settings',
            url: '/app/admin/settings',
            icon: 'fa fa-cog',
            permission: Permissions.MANAGE_FINANCE,
        }
    ],
};
