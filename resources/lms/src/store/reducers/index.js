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
import userReducer from './userReducer';
import membershipPlanReducer from './membershipPlanReducer';
import bookLanguageReducer from './bookLanguageReducer';
import bookReducer from './bookReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import circulationReducer from './circulationReducer';
import bookSeriesReducer from './bookSeriesReducer';
import memberReducer from './memberReducer';
import configReducer from './configReducer';
import availableBookReducer from './availableBookReducer';

export default combineReducers({
    genres: genreReducer,
    tags: tagReducer,
    authors: authorReducer,
    publishers: publisherReducer,
    membershipPlans: membershipPlanReducer,
    bookLanguages: bookLanguageReducer,
    books: bookReducer,
    users:userReducer,
    roles: roleReducer,
    booksSeries: bookSeriesReducer,
    members: memberReducer,
    circulations:circulationReducer,
    availableBooks:availableBookReducer,
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    permissions: permissionReducer,
    config: configReducer,
});
