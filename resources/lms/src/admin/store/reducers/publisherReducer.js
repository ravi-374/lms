import {publisherActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case publisherActionType.FETCH_PUBLISHERS:
            return {..._.mapKeys(action.payload, 'id')};
        case publisherActionType.FETCH_PUBLISHER:
        case publisherActionType.EDIT_PUBLISHER:
        case publisherActionType.ADD_PUBLISHER:
            return {...state, [action.payload.id]: action.payload};
        case publisherActionType.DELETE_PUBLISHER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
