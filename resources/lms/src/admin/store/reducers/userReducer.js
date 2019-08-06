import {userActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case userActionType.FETCH_USERS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case userActionType.FETCH_USER:
        case userActionType.ADD_USER:
            return {...state, [action.payload.id]: action.payload};
        case userActionType.EDIT_USER:
            const user = JSON.parse(atob(localStorage.getItem('user')));
            console.log(user);
            if (user && user.id === action.payload.id) {
                localStorage.removeItem('user');
                localStorage.setItem('user', btoa(JSON.stringify(action.payload)));
            }
            console.log(action.payload);
            return {...state, [action.payload.id]: action.payload};
        case userActionType.DELETE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
