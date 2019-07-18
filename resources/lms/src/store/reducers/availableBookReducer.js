import {avilableBookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case avilableBookActionType.FETCH_AVAILABLE_BOOKS:
            return [...action.payload];
        default:
            return state;
    }
}
