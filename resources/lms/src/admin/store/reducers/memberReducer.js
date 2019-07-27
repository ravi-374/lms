import {memberActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case memberActionType.FETCH_MEMBERS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case memberActionType.FETCH_MEMBER:
        case memberActionType.EDIT_MEMBER:
        case memberActionType.ADD_MEMBER:
            return {...state, [action.payload.id]: action.payload};
        case memberActionType.DELETE_MEMBER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
