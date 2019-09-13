import {bookActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';

export const fetchBooks = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('books')
        .then((response) => {
            dispatch({type: bookActionType.FETCH_BOOKS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
            dispatch(setLoading(false));
        });
};
