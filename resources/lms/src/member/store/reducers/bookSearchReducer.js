import {bookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookActionType.SEARCH_BOOKS:
        case bookActionType.RESET_SEARCH_BOOKS:
            return [...action.payload];
        case bookActionType.RESERVE_BOOK:
            const data = [...state];
            data[action.payload.index].is_available = action.payload.status;
            data[action.payload.index].expected_available_date = action.payload.expectedAvailableDate;
            return [...data];
        default:
            return state;
    }
}
