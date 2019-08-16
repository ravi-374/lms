import {bookHistoryActionType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY:
            return {..._.mapKeys(action.payload, 'id') };
        case bookHistoryActionType.BOOK_UN_RESERVED:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}
