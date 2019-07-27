import {bookHistoryActionType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        default:
            return state;
    }
}
