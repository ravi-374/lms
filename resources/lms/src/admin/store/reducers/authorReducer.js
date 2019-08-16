import {authorActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case authorActionType.FETCH_AUTHORS:
            return {..._.mapKeys(action.payload, 'id')};
        case authorActionType.FETCH_AUTHOR:
        case authorActionType.EDIT_AUTHOR:
        case authorActionType.ADD_AUTHOR:
            return {...state, [action.payload.id]: action.payload};
        case authorActionType.DELETE_AUTHOR:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
