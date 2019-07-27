import {tagActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case tagActionType.FETCH_TAGS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case tagActionType.FETCH_TAG:
        case tagActionType.EDIT_TAG:
        case tagActionType.ADD_TAG:
            return {...state, [action.payload.id]: action.payload};
        case tagActionType.DELETE_TAG:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
