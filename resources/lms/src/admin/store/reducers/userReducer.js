import {userActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case userActionType.FETCH_USERS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case userActionType.FETCH_USER:
        case userActionType.EDIT_USER:
        case userActionType.ADD_USER:
            return {...state, [action.payload.id]: action.payload};
        case userActionType.DELETE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
