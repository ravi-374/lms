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

export const genreActionType = {
    FETCH_GENRES: 'FETCH_GENRES',
    FETCH_GENRE: 'FETCH_GENRE',
    ADD_GENRE: 'ADD_GENRE',
    EDIT_GENRE: 'EDIT_GENRE',
    DELETE_GENRE: 'DELETE_GENRE',
};

export const tagActionType = {
    FETCH_TAGS: 'FETCH_TAGS',
    FETCH_TAG: 'FETCH_TAG',
    ADD_TAG: 'ADD_TAG',
    EDIT_TAG: 'EDIT_TAG',
    DELETE_TAG: 'DELETE_TAG',
};

export const authorActionType = {
    FETCH_AUTHORS: 'FETCH_AUTHORS',
    FETCH_AUTHOR: 'FETCH_AUTHOR',
    ADD_AUTHOR: 'ADD_AUTHOR',
    EDIT_AUTHOR: 'EDIT_AUTHOR',
    DELETE_AUTHOR: 'DELETE_AUTHOR',
};

export const bookLanguageActionType = {
    FETCH_BOOK_LANGUAGES: 'FETCH_BOOK_LANGUAGES',
    FETCH_BOOK_LANGUAGE: 'FETCH_BOOK_LANGUAGE',
    ADD_BOOK_LANGUAGE: 'ADD_BOOK_LANGUAGE',
    EDIT_BOOK_LANGUAGE: 'EDIT_BOOK_LANGUAGE',
    DELETE_BOOK_LANGUAGE: 'DELETE_BOOK_LANGUAGE',
};

export const publisherActionType = {
    FETCH_PUBLISHERS: 'FETCH_PUBLISHERS',
    FETCH_PUBLISHER: 'FETCH_PUBLISHER',
    ADD_PUBLISHER: 'ADD_PUBLISHER',
    EDIT_PUBLISHER: 'EDIT_PUBLISHER',
    DELETE_PUBLISHER: 'DELETE_PUBLISHER',
};

export const membershipPlanActionType = {
    FETCH_MEMBERSHIP_PLANS: 'FETCH_MEMBERSHIP_PLANS',
    FETCH_MEMBERSHIP_PLAN: 'FETCH_MEMBERSHIP_PLAN',
    ADD_MEMBERSHIP_PLAN: 'ADD_MEMBERSHIP_PLAN',
    EDIT_MEMBERSHIP_PLAN: 'EDIT_PUBLISHER',
    DELETE_MEMBERSHIP_PLAN: 'DELETE_PUBLISHER',
};

export const membershipPlanFrequency = {
    YEARLY: 1,
    MONTHLY: 2,
};

export const membershipPlanFrequencyOptions = [
    {id: 0, name: 'Select Frequency'},
    {id: 1, name: 'Yearly'},
    {id: 2, name: 'Monthly'}
];

export const bookActionType = {
    FETCH_BOOKS: 'FETCH_BOOKS',
    FETCH_BOOK: 'FETCH_BOOK',
    ADD_BOOK: 'ADD_BOOK',
    EDIT_BOOK: 'EDIT_BOOK',
    DELETE_BOOK: 'DELETE_BOOK'
};

export const bookFormatConstant = {
    FORMAT_HARDCOVER: 1,
    FORMAT_PAPERBACK: 2
};

export const bookStatusConstant = {
    STATUS_AVAILABLE: 1,
    STATUS_NOT_AVAILABLE: 2,
};

export const bookFormatOptions = [
    {id: 1, name: 'Hardcover'},
    {id: 2, name: 'Paperback'}
];

export const bookStatusOptions = [
    {id: 0, name: 'Select Status'},
    {id: 1, name: 'Available'},
    {id: 2, name: 'Not available'},
];

export const errorMessage = {
    TOKEN_NOT_PROVIDED: 'Token not provided',
    TOKEN_EXPIRED: 'Token has expired'
};

export const memberActionType = {
    FETCH_MEMBERS: 'FETCH_MEMBERS',
    FETCH_MEMBER: 'FETCH_MEMBER',
    ADD_MEMBER: 'ADD_MEMBER',
    EDIT_MEMBER: 'EDIT_MEMBER',
    DELETE_MEMBER: 'DELETE_MEMBER'
};
export const roleActionType = {
    FETCH_ROLES: 'FETCH_ROLES',
    FETCH_ROLE: 'FETCH_ROLE',
    ADD_ROLE: 'ADD_ROLE',
    EDIT_ROLE: 'EDIT_ROLE',
    DELETE_ROLE: 'DELETE_ROLE'
};

export const permissionActionType = {
    FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',
};
