import {settingsActionsType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';

export const fetchSettings = (isLoading = true) => async (dispatch) => {
    dispatch(setLoading(isLoading));
    await apiConfig.get('settings')
        .then((response) => {
            dispatch({type: settingsActionsType.FETCH_SETTINGS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const fetchCurrencies = () => async (dispatch) => {
    await apiConfig.get('currencies')
        .then((response) => {
            dispatch({type: settingsActionsType.FETCH_CURRENCIES, payload: response.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const postCurrencies = (settings) => async (dispatch) => {
    await apiConfig.post('settings', settings)
        .then((response) => {
            dispatch({type: settingsActionsType.POST_SETTINGS, payload: response.data});
            dispatch(addToast({text: response.data.message}));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};