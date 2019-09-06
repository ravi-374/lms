export const constants = {
    IS_LOADING: 'IS_LOADING',
    SEARCH_ACTION: 'SEARCH_ACTION',
    SORT_ACTION: 'SORT_ACTION',
    FILTER_ACTION: 'FILTER_ACTION',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    ADD_TOAST: 'ADD_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
    ERROR_ACTION: 'ERROR_ACTION',
    GET_SET_CURRENCY: 'GET_SET_CURRENCY'
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
    MEMBER_HOME: '/app/home',
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
    USER_PROFILE: '/app/admin/user-profile',
    MEMBER_PROFILE: '/app/member-profile',
};

export const Tokens = {
    ADMIN: 'authtoken',
    MEMBER: 'memberToken'
};

export const Filters = {
    PAGE: 1,
    OBJ: {
        order_By: '',
        limit: 10,
        skip: 0,
        direction: 'asc',
        search: ''
    }
};

export const Roles = {
    ADMIN_ROLE_NAME: 'admin'
};

export const FilterOption = {
    ALL: 'all'
};

export const localStorageActionType = {
    GET_PROFILE: 'GET_PROFILE',
    SET_PROFILE: 'SET_PROFILE',
    CLEAR_PROFILE: 'CLEAR_PROFILE'
};

export const dateFormat = {
    DEFAULT_MOMENT: 'YYYY-MM-DD hh:mm:ss',
    NATIVE: 'YYYY-MM-DD'
};

export const LocalStorageKey = {
    USER: 'user',
    MEMBER: 'member'
};

export const appSettingActionType = {
    FETCH_APP_SETTING: 'FETCH_APP_SETTING',
    EDIT_APP_SETTING: 'EDIT_APP_SETTING',
};

export const appSettingsKey = {
    LIBRARY_NAME: 'library_name',
    LIBRARY_LOGO: 'library_logo',
};
