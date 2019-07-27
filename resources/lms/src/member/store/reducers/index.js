import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from '../../store/reducers/progressReducer';
import searchReducer from '../../store/reducers/searchReducer';
import sortReducer from '../../store/reducers/sortReducer';
import toastReducer from '../../store/reducers/toastReducer';
import modalReducer from './modalReducer';
import memberReducer from './memberReducer';
import membershipPlanReducer from './membershipPlanReducer';
import countryReducer from './countryReducer';
import bookHistoryReducer from './bookHistoryReducer';
import bookReducer from './bookReducer';
import bookSearchReducer from './bookSearchReducer';
import authorReducer from './authorReducer';

export default combineReducers({
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    member: memberReducer,
    membershipPlans: membershipPlanReducer,
    countries: countryReducer,
    bookHistory: bookHistoryReducer,
    books: bookReducer,
    searchBooks: bookSearchReducer,
    authors: authorReducer,
});