import {constants} from '../../member/constants/index';

export default (state = false, action) => {
    switch (action.type) {
        case constants.TOGGLE_ACTION:
            return !state;
        default:
            return state;
    }
}
