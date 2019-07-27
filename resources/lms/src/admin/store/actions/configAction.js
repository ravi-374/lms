import {configActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';

export const fetchConfig = () => async (dispatch) => {
    await apiConfig.get('config')
        .then((response) => {
            dispatch({type: configActionType.FETCH_CONFIG, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
