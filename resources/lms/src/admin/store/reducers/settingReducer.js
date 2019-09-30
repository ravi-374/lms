import {settingsActionsType} from '../../constants';
import _ from 'lodash';

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case settingsActionsType.FETCH_SETTINGS:
        case settingsActionsType.POST_SETTINGS:
            return { ..._.mapKeys(payload, 'key') };
        case settingsActionsType.POST_LOGO:
            return { payload };
        default:
            return state;
    }
}
