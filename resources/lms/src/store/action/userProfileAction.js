import {userProfileActionType} from "../../constants";

export const getUserProfile = (user) => {
    return {
        type: userProfileActionType.GET_PROFILE,
        payload: user
    };
};

export const setUserProfile = (user,data) => {
    return {
        type: userProfileActionType.SET_PROFILE,
        payload: {user, data:data}
    };
};
