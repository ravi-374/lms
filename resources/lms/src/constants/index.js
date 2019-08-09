export const constants = {
    IS_LOADING: 'IS_LOADING',
    SEARCH_ACTION: 'SEARCH_ACTION',
    SORT_ACTION: 'SORT_ACTION',
    FILTER_ACTION: 'FILTER_ACTION',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    ADD_TOAST: 'ADD_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
    ERROR_ACTION: 'ERROR_ACTION'
};

export const countryCode = {
    INR: 'INR',
    USD: 'USD',
    GBP: 'GBP',
    AED: 'AED',
    CAD: 'CAD',
    CNY: 'CNY',
    RUB: 'RUB'
};

export const Routes = {
    MEMBER_LOGIN: '/app/login',
    MEMBER_DEFAULT: '/app/books',
    ADMIN_LOGIN: '/app/admin/login',
    ADMIN_DEFAULT: '/app/admin/books',
    BOOKS: '/app/admin/books/',
    MEMBERS: '/app/admin/members/',
    BOOK_ALLOTMENTS: '/app/admin/books-allotment/',
    USERS: '/app/admin/users/',
    MEMBER_FORGOT_PASSWORD: '/app/forgot-password',
    MEMBER_RESET_PASSWORD: '/app/reset-password',
    ADMIN_FORGOT_PASSWORD: '/app/admin/forgot-password',
    ADMIN_RESET_PASSWORD: '/app/admin/reset-password',
};

export const Tokens = {
    ADMIN: 'authtoken',
    MEMBER: 'memberToken'
};

export const Roles = {
    ADMIN_ROLE_NAME: 'admin'
};
