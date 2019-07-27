import {bookAllotmentStatusConstant, memberBookHistoryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from "./modalAction";

export const fetchMemberBooksHistory = (memberId) => async (dispatch) => {
    await apiConfig.get(`members/${memberId}/books-history`)
        .then((response) => {
            dispatch({type: memberBookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editMemberBookHistory = (book) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRoute(book.status)}`, book)
        .then((response) => {
            dispatch({type: memberBookHistoryActionType.EDIt_MEMBER_BOOK_HISTORY, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

const getApiRoute = (status) => {
    switch (status) {
        case bookAllotmentStatusConstant.BOOK_RESERVED:
            return 'reserve-book';
        case bookAllotmentStatusConstant.BOOK_ISSUED:
            return 'issue-book';
        default:
            return 'return-book';
    }
};
