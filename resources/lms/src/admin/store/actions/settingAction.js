import {settingsActionsType, settingsKey, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {getOrSetCurrency} from "../../../store/action/currencyAction";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import {editAppSetting} from "../../../store/action/appSettingAction";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchSettings = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.SETTING)
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
            // dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const fetchCurrencies = () => async (dispatch) => {
    await apiConfig.get(apiBaseURL.CURRENCY)
        .then((response) => {
            dispatch({ type: settingsActionsType.FETCH_CURRENCIES, payload: response.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const postSettings = (settings) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.SETTING, settings)
        .then((response) => {
            dispatch({ type: settingsActionsType.POST_SETTINGS, payload: response.data.data });
            dispatch(editAppSetting(prepareAppSetting(response.data.data)));
            dispatch(addToast({ text: getFormattedMessage('settings.success.create.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const postAppLogo = (settings) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.UPLOAD_LOGO, settings)
        .then((response) => {
            dispatch({ type: settingsActionsType.POST_LOGO, payload: response.data.data });
            dispatch(editAppSetting(response.data.data));
            dispatch(addToast({ text: getFormattedMessage('settings.success.upload-logo.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const postAppFavicon = (settings) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.UPLOAD_FAVICON, settings)
        .then((response) => {
            dispatch({ type: settingsActionsType.POST_FAVICON, payload: response.data.data });
            dispatch(editAppSetting(response.data.data));
            dispatch(addToast({ text: getFormattedMessage('settings.success.upload-favicon.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

const prepareAppSetting = (settings) => {
    return settings.find(setting => setting.key === settingsKey.LIBRARY_NAME);
};
