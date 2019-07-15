import {bookLanguageActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case bookLanguageActionType.FETCH_BOOK_LANGUAGES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case bookLanguageActionType.FETCH_BOOK_LANGUAGE:
        case bookLanguageActionType.EDIT_BOOK_LANGUAGE:
        case bookLanguageActionType.ADD_BOOK_LANGUAGE:
            return {...state, [action.payload.id]: action.payload};
        case bookLanguageActionType.DELETE_BOOK_LANGUAGE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
