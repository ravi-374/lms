import {settingsActionsType} from '../../constants';

export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case settingsActionsType.FETCH_CURRENCIES:
            return [...payload];
        default:
            return state;
    }
}
