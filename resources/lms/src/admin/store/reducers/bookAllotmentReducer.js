import {bookAllotmentActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case bookAllotmentActionType.FETCH_BOOKS_ALLOTMENT:
            return {..._.mapKeys(action.payload, 'id')};
        case bookAllotmentActionType.FETCH_BOOK_ALLOTMENT:
        case bookAllotmentActionType.ADD_BOOK_ALLOTMENT:
        case bookAllotmentActionType.EDIT_BOOK_ALLOTMENT:
            return {...state, [action.payload.id]: action.payload};
        case bookAllotmentActionType.DELETE_BOOK_ALLOTMENT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
