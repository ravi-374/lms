import {settingsActionsType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case settingsActionsType.FETCH_SETTINGS:
            return {...state, ..._.mapKeys(payload, 'id')};
        case settingsActionsType.POST_SETTINGS:
            return {...state, [payload.id]: payload};
        default:
            return state;
    }
}