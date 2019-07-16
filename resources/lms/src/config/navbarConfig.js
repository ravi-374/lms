import {Permissions} from "../constants";

export default {
    items: [
        {
            name: 'Users',
            url: '/app/users',
            icon: 'icon-user',
            permission: Permissions.MANAGE_USERS,
        },
        {
            name: 'Books',
            url: '/app/books',
            icon: 'icon-book-open',
            permission: Permissions.MANAGE_BOOKS,
        },
        {
            name: 'Genres',
            url: '/app/genres',
            icon: 'icon-layers',
            permission: Permissions.MANAGE_GENRES,
        },
        {
            name: 'Authors',
            url: '/app/authors',
            icon: 'icon-briefcase',
            permission: Permissions.MANAGE_AUTHORS,
        },
        {
            name: 'Publishers',
            url: '/app/publishers',
            icon: 'icon-envelope-open',
            permission: Permissions.MANAGE_PUBLISHERS,
        },
        {
            name: 'Book Languages',
            url: '/app/book-languages',
            icon: 'icon-note',
            permission: Permissions.MANAGE_BOOK_LANGUAGES,
        },
        {
            name: 'Tags',
            url: '/app/tags',
            icon: 'icon-tag',
            permission: Permissions.MANAGE_TAGS,
        },
        {
            name: 'Roles',
            url: '/app/roles',
            icon: 'icon-grid',
            permission: Permissions.MANAGE_ROLES,
        },
        {
            name: 'Membership Plans',
            url: '/app/membership-plans',
            icon: 'icon-briefcase',
            permission: Permissions.MANAGE_PLANS,
        },
        {
            name: 'Books Series',
            url: '/app/books-series',
            icon: 'icon-grid',
            permission: Permissions.MANAGE_BOOK_SERIES,
        },
        {
            name: 'Members',
            url: '/app/members',
            icon: 'icon-user',
            permission: Permissions.MANAGE_MEMBERS,
        }
    ],
};
