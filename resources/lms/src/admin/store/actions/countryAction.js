import {countryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';

export const fetchCountries = () => async (dispatch) => {
    await apiConfig.get(`countries`)
        .then((response) => {
            dispatch({type: countryActionType.FETCH_COUNTRIES, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};
