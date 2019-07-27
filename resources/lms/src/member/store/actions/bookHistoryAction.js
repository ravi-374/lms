import {bookHistoryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {toggleModal} from "../../../admin/store/actions/modalAction";

export const fetchBooksHistory = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`books-history`).then((response) => {
        dispatch({type: bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data});
        dispatch(setLoading(false));
    }).catch(({response}) => {
        dispatch(setLoading(false));
        dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
    });
};

export const unReserveBook = (bookItemId) => async (dispatch) => {
    await apiConfig.post(`books/${bookItemId}/un-reserve-book`, {})
        .then(response => {
            addToast({text: response.data.message});
            dispatch({type: bookHistoryActionType.BOOK_UN_RESERVED, payload: response.data.data});
            dispatch(toggleModal());
        }).catch(({response}) => {
            dispatch(toggleModal());
            addToast({text: response.data.message, type: 'error'});
        });
};
