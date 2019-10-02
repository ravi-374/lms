import {authActionType} from '../../constants/index';

export default (state = {}, action) => {
    switch (action.type) {
        case authActionType.LOGIN:
        case authActionType.LOGOUT:
        case authActionType.RESET_PASSWORD:
            return action.payload;
        case authActionType.FORGOT_PASSWORD:
            return { isSubmitted: action.payload };
        default:
            return state;
    }
}
