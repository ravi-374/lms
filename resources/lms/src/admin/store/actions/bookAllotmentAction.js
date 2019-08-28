import {bookAllotmentActionType, toastType, bookAllotmentStatusConstant} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';

export const fetchBooksAllotment = (filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = 'books-history';

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.FETCH_BOOKS_ALLOTMENT, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const fetchBookAllotment = (bookAllotmentId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`issued-books/${bookAllotmentId}`)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.FETCH_BOOK_ALLOTMENT, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const addBookAllotment = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRoute(book.status)}`, book)
        .then((response) => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookAllotment = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRoute(book.status)}`, book)
        .then((response) => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookAllotmentStatus = (book, filterObj = {}) => async (dispatch) => {
    await apiConfig.put(`books/${book.book_item_id}/update-issued-book-status`, { status: book.status })
        .then((response) => {
            dispatch(fetchBooksAllotment(filterObj));
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookAllotment = (bookId) => async (dispatch) => {
    await apiConfig.delete(`books-history/${bookId}`)
        .then((response) => {
            dispatch({ type: bookAllotmentActionType.DELETE_BOOK_ALLOTMENT, payload: bookId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

const getApiRoute = (status) => {
    switch (status) {
        case bookAllotmentStatusConstant.BOOK_RESERVED:
            return 'reserve-book';
        case bookAllotmentStatusConstant.BOOK_ISSUED:
            return 'issue-book';
        case bookAllotmentStatusConstant.BOOK_RETURNED:
            return 'return-book';
        default:
            return 'un-reserve-book';
    }
};
