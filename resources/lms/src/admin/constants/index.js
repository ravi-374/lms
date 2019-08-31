export const constants = {
    SET_TOTAL_RECORD: 'SET_TOTAL_RECORD',
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
    MONTHLY: 1,
    YEARLY: 2,
};

export const membershipPlanFrequencyOptions = [
    { id: 1, name: 'Monthly' },
    { id: 2, name: 'Yearly' },
];

export const bookActionType = {
    FETCH_BOOKS: 'FETCH_BOOKS',
    FETCH_BOOKS_BY_MEMBER: 'FETCH_BOOKS_BY_MEMBER',
    FETCH_BOOK: 'FETCH_BOOK',
    ADD_BOOK: 'ADD_BOOK',
    EDIT_BOOK: 'EDIT_BOOK',
    DELETE_BOOK: 'DELETE_BOOK'
};

export const availableBookActionType = {
    FETCH_AVAILABLE_BOOKS: 'FETCH_AVAILABLE_BOOKS',
};

export const bookFormatConstant = {
    FORMAT_HARDCOVER: 1,
    FORMAT_PAPERBACK: 2
};

export const bookStatusConstant = {
    STATUS_NOT_AVAILABLE: 0,
    STATUS_AVAILABLE: 1
};

export const bookFormatOptions = [
    { id: 1, name: 'Hardcover' },
    { id: 2, name: 'Paperback' }
];

export const bookStatusOptions = [
    { id: 1, name: 'Reserved' },
    { id: 2, name: 'Issued' },
    { id: 3, name: 'Returned' },
    { id: 4, name: 'Available' },
    { id: 5, name: 'Unreserved' },
    { id: 6, name: 'Lost' },
    { id: 7, name: 'Damage' }
];

export const errorMessage = {
    TOKEN_NOT_PROVIDED: 'Token not provided',
    TOKEN_EXPIRED: 'Token has expired'
};

export const userActionType = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USER: 'FETCH_USER',
    ADD_USER: 'ADD_USER',
    EDIT_USER: 'EDIT_USER',
    SET_ACTIVE_DE_ACTIVE: 'SET_ACTIVE_DE_ACTIVE',
    DELETE_USER: 'DELETE_USER'
};

export const memberActionType = {
    FETCH_MEMBERS: 'FETCH_MEMBERS',
    FETCH_MEMBER: 'FETCH_MEMBER',
    ADD_MEMBER: 'ADD_MEMBER',
    EDIT_MEMBER: 'EDIT_MEMBER',
    DELETE_MEMBER: 'DELETE_MEMBER',
    SET_ACTIVE_DE_ACTIVE: 'SET_ACTIVE_DE_ACTIVE'
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

export const bookAllotmentActionType = {
    FETCH_BOOKS_ALLOTMENT: 'FETCH_BOOKS_ALLOTMENT',
    FETCH_BOOK_ALLOTMENT: 'FETCH_BOOK_ALLOTMENT',
    DELETE_BOOK_ALLOTMENT: 'DELETE_BOOK_ALLOTMENT'
};

export const bookAllotmentStatusOptions = [
    { id: 1, name: 'Reserve' },
    { id: 2, name: 'Issue' },
    { id: 3, name: 'Return' },
    // {id: 4, name: 'Lost'},
    // {id: 5, name: 'Damaged'},
];

export const bookAllotmentStatusConstant = {
    BOOK_RESERVED: 1,
    BOOK_ISSUED: 2,
    BOOK_RETURNED: 3,
    BOOK_AVAILABLE: 4,
    BOOK_UN_RESERVED: 5,
    BOOK_LOST: 6,
    BOOK_DAMAGED: 7
};

export const toastType = {
    ERROR: 'error'
};

export const bookSeriesActionType = {
    FETCH_BOOKS_SERIES: 'FETCH_BOOKS_SERIES',
    FETCH_BOOK_SERIES: 'FETCH_BOOK_SERIES',
    ADD_BOOK_SERIES: 'ADD_BOOK_SERIES',
    EDIT_BOOK_SERIES: 'EDIT_BOOK_SERIES',
    DELETE_BOOK_SERIES: 'DELETE_BOOK_SERIES'
};

export const configActionType = {
    FETCH_CONFIG: 'FETCH_CONFIG',
};

export const Permissions = {
    MANAGE_BOOKS: 'manage_books',
    ISSUE_BOOKS: 'issue_books',
    MANAGE_MEMBERS: 'manage_members',
    MANAGE_FINANCE: 'manage_finance',
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_AUTHORS: 'manage_authors',
    MANAGE_PUBLISHERS: 'manage_publishers',
    MANAGE_BOOK_SERIES: 'manage_book_series',
    MANAGE_BOOK_LANGUAGES: 'manage_book_languages',
    MANAGE_PLANS: 'manage_plans',
    MANAGE_TAGS: 'manage_tags',
    MANAGE_GENRES: 'manage_genres',
    MANAGE_USERS: 'manage_users'
};

export const memberBookHistoryActionType = {
    FETCH_MEMBER_BOOK_ALLOTMENT: 'FETCH_MEMBER_BOOK_ALLOTMENT',
    EDIT_MEMBER_BOOK_ALLOTMENT: 'EDIt_MEMBER_BOOK_ALLOTMENT',
};

export const countryActionType = {
    FETCH_COUNTRIES: 'FETCH_COUNTRIES'
};

export const userProfileActionType = {
    FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
    EDIT_USER_PROFILE: 'EDIT_USER_PROFILE',
};

export const settingsActionsType = {
    FETCH_SETTINGS: 'FETCH_SETTINGS',
    POST_SETTINGS: 'POST_SETTINGS',
    FETCH_CURRENCIES: 'FETCH_CURRENCIES',
};

export const settingsKey = {
    CURRENCY: 'currency',
    ISSUE_DUE_DAYS: 'issue_due_days',
    RETURN_DUE_DAYS: 'return_due_days',
    RESERVE_DUE_DAYS: 'reserve_due_days',
};

export const settingsDisplayName = {
    ISSUE_DUE_DAYS: 'Issue Due Days',
    RETURN_DUE_DAYS: 'Return Due Days',
    RESERVE_DUE_DAYS: 'Reserve Due Days',
};

export const bookItemActionType = {
    SET_BOOKS_ITEMS: 'SET_BOOKS_ITEMS',
    ADD_BOOK_ITEM: 'ADD_BOOK_ITEM',
    DELETE_BOOK_ITEM: 'DELETE_BOOK_ITEM'
};

export const maxDigits = {
    BOOK_CODE: 8
};

export const bookItemStatusConstants = {
    AVAILABLE: 1,
    UNAVAILABLE: 2,
    LOST: 3,
    DAMAGE: 4
};

export const bookItemStatusOptions = [
    { id: 1, name: 'Available' },
    { id: 2, name: 'Unavailable' },
    { id: 3, name: 'Lost' },
    { id: 4, name: 'Damaged' },
];

export const bookAllotmentFilterOptions = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Issued' },
    { id: 3, name: 'Returned' },
    { id: 4, name: 'Reserved' },
    { id: 5, name: 'Unreserved' },
    { id: 6, name: 'Damaged' },
    { id: 7, name: 'Lost' }
];

export const storageKey = {
    BOOK_ALLOTMENT: 'book_allotment',
    MEMBERS: 'members',
};
