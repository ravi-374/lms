import {settingsActionsType, settingsKey, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {getOrSetCurrency} from "../../../store/action/currencyAction";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import {editAppSetting} from "../../../store/action/appSettingAction";

export const fetchSettings = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get('settings')
        .then((response) => {
            dispatch({ type: settingsActionsType.FETCH_SETTINGS, payload: response.data.data });
            const currencies = response.data.data.filter(setting => setting.key === settingsKey.CURRENCY)
                .map(({ value, display_name }) => ({
                    id: value,
                    name: display_name,
                }));
            dispatch(getOrSetCurrency(currencies[0].id));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const fetchCurrencies = () => async (dispatch) => {
    await apiConfig.get('currencies')
        .then((response) => {
            dispatch({ type: settingsActionsType.FETCH_CURRENCIES, payload: response.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const postSettings = (settings) => async (dispatch) => {
    await apiConfig.post('settings', settings)
        .then((response) => {
            dispatch({ type: settingsActionsType.POST_SETTINGS, payload: response.data.data });
            dispatch(editAppSetting(prepareAppSetting(response.data.data)));
            dispatch(addToast({ text: response.data.message }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const postAppLogo = (settings) => async (dispatch) => {
    await apiConfigWthFormData.post('upload-logo', settings)
        .then((response) => {
            dispatch({ type: settingsActionsType.POST_LOGO, payload: response.data.data });
            dispatch(editAppSetting(response.data.data));
            dispatch(addToast({ text: response.data.message }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

const prepareAppSetting = (settings) => {
    return settings.find(setting => setting.key === settingsKey.LIBRARY_NAME);
};
