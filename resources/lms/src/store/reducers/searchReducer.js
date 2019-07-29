import {constants} from '../../member/constants/index'

export default (state = '', action) => {
    switch (action.type) {
        case constants.SEARCH_ACTION:
            return action.payload;
        default: {
            return state;
        }
    }
}
