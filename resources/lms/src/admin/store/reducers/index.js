import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from '../../../store/reducers/progressReducer';
import searchReducer from '../../../store/reducers/searchReducer';
import sortReducer from '../../../store/reducers/sortReducer';
import genreReducer from './genreReducer';
import toastReducer from '../../../store/reducers/toastReducer';
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
import bookAllotmentReducer from './bookAllotmentReducer';
import bookSeriesReducer from './bookSeriesReducer';
import memberReducer from './memberReducer';
import configReducer from './configReducer';
import availableBookReducer from './availableBookReducer';
import memberBookHistoryReducer from './memberBookHistoryReducer';

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
    booksAllotment:bookAllotmentReducer,
    availableBooks:availableBookReducer,
    memberBookHistory:memberBookHistoryReducer,
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    permissions: permissionReducer,
    config: configReducer,
});
