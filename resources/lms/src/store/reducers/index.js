import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from './progressReducer';
import searchReducer from './searchReducer';
import sortReducer from './sortReducer';
import genreReducer from './genreReducer';
import toastReducer from './toastReducer';
import modalReducer from './modalReducer';
import tagReducer from './tagReducer';
import authorReducer from './authorReducer';
import publisherReducer from './publisherReducer';
import membershipPlanReducer from './membershipPlanReducer';
import bookLanguageReducer from './bookLanguageReducer';
import bookReducer from './bookReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import memberReducer from './memberReducer';

export default combineReducers({
    genres: genreReducer,
    tags: tagReducer,
    authors: authorReducer,
    publishers: publisherReducer,
    membershipPlans: membershipPlanReducer,
    bookLanguages: bookLanguageReducer,
    books: bookReducer,
    roles: roleReducer,
    members: memberReducer,
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    permissions: permissionReducer
});
