import {userProfileActionType} from "../../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case userProfileActionType.SET_PROFILE:
            localStorage.setItem(action.payload.user, btoa(JSON.stringify(action.payload.data)));
            return action.payload;
        case userProfileActionType.GET_PROFILE:
            return localStorage.getItem(action.payload) ?
                JSON.parse(atob(localStorage.getItem(action.payload))) : null;
        default:
            return state;
    }
}
