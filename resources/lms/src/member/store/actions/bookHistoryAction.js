import {bookHistoryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {toggleModal} from "../../../store/action/modalAction";
import {setTotalRecord} from "../../../admin/store/actions/totalRecordAction";
import requestParam from "../../../shared/requestParam";

export const fetchBooksHistory = (filter) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = 'books-history';
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }
    await apiConfig.get(url).then((response) => {
        dispatch({type: bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data});
        dispatch(setTotalRecord(response.data.totalRecords));
        dispatch(setLoading(false));
    }).catch(({response}) => {
        dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        dispatch(setLoading(false));
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
