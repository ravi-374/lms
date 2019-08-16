import {memberBookHistoryActionType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case memberBookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY:
            return {..._.mapKeys(action.payload, 'id')};
        case memberBookHistoryActionType.EDIT_MEMBER_BOOK_HISTORY:
            return {...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
}
