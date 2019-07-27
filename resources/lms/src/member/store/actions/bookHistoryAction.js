import {bookHistoryActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from './toastAction';

export const fetchBooksHistory = () => async (dispatch) => {
    await apiConfig.get(`books-history`)
        .then((response) => {
            dispatch({ type: bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};
