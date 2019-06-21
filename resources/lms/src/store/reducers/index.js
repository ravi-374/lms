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
import bookLanguageReducer from './bookLanguageReducer';

export default combineReducers({
    genres:genreReducer,
    tags:tagReducer,
    authors:authorReducer,
    bookLanguages:bookLanguageReducer,
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts:toastReducer,
    isToggle:modalReducer,
});
