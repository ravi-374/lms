import {availableBookActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from './toastAction';

export const fetchAvailableBooks = (bookId, memberId) => async (dispatch) => {
    await apiConfig.get(`books/${bookId}/available-books?member_id=${memberId}`)
        .then((response) => {
            dispatch({type: availableBookActionType.FETCH_AVAILABLE_BOOKS, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
