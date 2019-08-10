import {genreActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case genreActionType.FETCH_GENRES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case genreActionType.FETCH_GENRE:
        case genreActionType.EDIT_GENRE:
        case genreActionType.ADD_GENRE:
            return {...state, [action.payload.id]: action.payload};
        case genreActionType.DELETE_GENRE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
