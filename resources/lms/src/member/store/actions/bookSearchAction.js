import {bookActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';

export const findBooks = (params) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`search-books?${params}`)
        .then((response) => {
            dispatch({ type: bookActionType.SEARCH_BOOKS, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const resetSearchBooks = () => (dispatch) => {
    dispatch({ type: bookActionType.RESET_SEARCH_BOOKS, payload: [] });
};

export const reserveBook = (bookItemId, index) => async (dispatch) => {
    apiConfig.post(`books/${bookItemId}/reserve-book `, {})
        .then((response) => {
            dispatch({
                type: bookActionType.RESERVE_BOOK,
                payload: {
                    status: response.data.data.book_item.is_available,
                    index,
                    expectedAvailableDate: response.data.data.expected_available_date
                }
            });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
