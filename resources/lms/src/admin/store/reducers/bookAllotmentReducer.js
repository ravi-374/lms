import {bookAllotmentActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookAllotmentActionType.FETCH_BOOKS_ALLOTMENT:
            return action.payload;
        case bookAllotmentActionType.FETCH_BOOK_ALLOTMENT:
            return [action.payload];
        case bookAllotmentActionType.DELETE_BOOK_ALLOTMENT:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
