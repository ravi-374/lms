import {countryActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';

export const fetchCountries = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`countries`)
        .then((response) => {
            dispatch({type: countryActionType.FETCH_COUNTRIES, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};
