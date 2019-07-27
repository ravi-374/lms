import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from './progressReducer';
import searchReducer from './searchReducer';
import sortReducer from './sortReducer';
import toastReducer from './toastReducer';
import modalReducer from './modalReducer';
import bookHistoryReducer from "./bookHistoryReducer";

export default combineReducers({
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    bookHistory: bookHistoryReducer,
});
