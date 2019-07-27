import {bookAllotmentActionType, toastType, bookAllotmentStatusConstant} from '../../constants';
import apiConfig from '../../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchBooksAllotment = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('books-history')
        .then((response) => {
            dispatch({type: bookAllotmentActionType.FETCH_BOOKS_ALLOTMENT, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const fetchBookAllotment = (bookAllotmentId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`issued-books/${bookAllotmentId}`)
        .then((response) => {
            dispatch({type: bookAllotmentActionType.FETCH_BOOK_ALLOTMENT, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const addBookAllotment = (book) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRoute(book.status)}`, book)
        .then((response) => {
            dispatch({type: bookAllotmentActionType.ADD_BOOK_ALLOTMENT, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const editBookAllotment = (book) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRoute(book.status)}`, book)
        .then((response) => {
            dispatch({type: bookAllotmentActionType.EDIT_BOOK_ALLOTMENT, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const deleteBookAllotment = (bookId) => async (dispatch) => {
    await apiConfig.delete(`books-history/${bookId}`)
        .then((response) => {
            dispatch({type: bookAllotmentActionType.DELETE_BOOK_ALLOTMENT, payload: bookId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
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
