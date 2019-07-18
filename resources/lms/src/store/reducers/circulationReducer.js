import {circulationActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case circulationActionType.FETCH_CIRCULATIONS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case circulationActionType.FETCH_CIRCULATION:
        case circulationActionType.ADD_CIRCULATION:
        case circulationActionType.EDIT_CIRCULATION:
            return {...state, [action.payload.id]: action.payload};
        case circulationActionType.DELETE_CIRCULATION:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
