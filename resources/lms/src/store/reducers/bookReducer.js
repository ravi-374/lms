import {bookActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case bookActionType.FETCH_BOOKS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case bookActionType.FETCH_BOOKS_BY_MEMBER:
            return {...state, bookItems: _.mapKeys(action.payload, 'id')};
        case bookActionType.FETCH_BOOK:
        case bookActionType.EDIT_BOOK:
        case bookActionType.ADD_BOOK:
            return {...state, [action.payload.id]: action.payload};
        case bookActionType.DELETE_BOOK:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
