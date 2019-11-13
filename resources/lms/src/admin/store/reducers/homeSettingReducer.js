import {settingsActionsType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case settingsActionsType.FETCH_HOME_SETTINGS:
        case settingsActionsType.POST_HOME_SETTINGS:
            return {..._.mapKeys(payload, 'key')};
        default:
            return state;
    }
}
