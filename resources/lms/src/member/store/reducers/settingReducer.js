import {settingActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case settingActionType.FETCH_SETTING:
            return { ..._.mapKeys(action.payload, 'key') };
        default:
            return state;
    }
}
