export const toastType = {
    ERROR: 'error'
};

export const memberActionType = {
    FETCH_MEMBER: 'FETCH_MEMBER',
    EDIT_MEMBER: 'EDIT_MEMBER',
};

export const membershipPlanActionType = {
    FETCH_MEMBERSHIP_PLANS: 'FETCH_MEMBERSHIP_PLANS'
};

export const countryActionType = {
    FETCH_COUNTRIES: 'FETCH_COUNTRIES'
};

export const bookCirculationStatusConstant = {
    BOOK_RESERVED: 1,
    BOOK_ISSUED: 2,
    BOOK_RETURNED: 3,
    BOOK_AVAILABLE: 4,
    BOOK_UN_RESERVED: 5,
    BOOK_LOST: 6,
    BOOK_DAMAGED: 7,
};

export const bookHistoryActionType = {
    FETCH_MEMBER_BOOK_HISTORY: 'FETCH_MEMBER_BOOK_HISTORY',
    BOOK_UN_RESERVED: 'BOOK_UN_RESERVED',
};

export const bookActionType = {
    FETCH_BOOKS: 'FETCH_BOOKS',
    FETCH_FEATURED_BOOKS: 'FETCH_FEATURED_BOOKS',
    SEARCH_BOOKS: 'SEARCH_BOOKS',
    RESERVE_BOOK: 'RESERVE_BOOK',
    RESET_SEARCH_BOOKS: 'RESET_SEARCH_BOOKS',
};

export const authorActionType = {
    FETCH_AUTHORS: 'FETCH_AUTHORS',
};

export const bookStatusOptions = [
    { id: 1, name: 'Reserved' },
    { id: 2, name: 'Issued' },
    { id: 3, name: 'Returned' },
    { id: 4, name: 'Available' },
    { id: 5, name: 'Unreserved' }
];

export const bookStatusConstant = {
    STATUS_NOT_AVAILABLE: 0,
    STATUS_AVAILABLE: 1
};

export const bookItemStatusConstants = {
    AVAILABLE: 1,
    UNAVAILABLE: 2,
    LOST: 3,
    DAMAGE: 4
};

export const settingActionType = {
    FETCH_SETTING: 'FETCH_SETTING'
};

export const settingsKey = {
    LANGUAGE: 'language',
    DEFAULT_LOCALE: 'en',
    LOCALE_ARABIC: 'en',
    LOCALE_SPANISH: 'sp'
};

export const authActionType = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD',
};

export const bookRequestActionType = {
    FETCH_ADMIN_BOOKS_REQUEST: 'FETCH_ADMIN_BOOKS_REQUEST',
    FETCH_ADMIN_BOOK_REQUEST: 'FETCH_ADMIN_BOOK_REQUEST',
    ADD_ADMIN_BOOK_REQUEST: 'ADD_ADMIN_BOOK_REQUEST',
    EDIT_ADMIN_BOOK_REQUEST: 'EDIT_ADMIN_BOOK_REQUEST',
    DELETE_ADMIN_BOOK_REQUEST: 'DELETE_ADMIN_BOOK_REQUEST',
};
