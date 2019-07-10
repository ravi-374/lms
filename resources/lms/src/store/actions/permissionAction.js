import {permissionActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from './toastAction';

export const fetchPermissions = () => async (dispatch) => {
    await apiConfig.get('permissions')
        .then((response) => {
            dispatch({type: permissionActionType.FETCH_PERMISSIONS, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
