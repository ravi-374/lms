import {bookItemActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

export const setBookItems = (bookItems) => async (dispatch) => {
    dispatch({type: bookItemActionType.SET_BOOKS_ITEMS, payload: bookItems});
};

export const addBookItem = (bookId, items) => async (dispatch) => {
    await apiConfig.post(`books/${+bookId}/items`, {items})
        .then((response) => {
            dispatch({type: bookItemActionType.ADD_BOOK_ITEM, payload: response.data.items});
            dispatch(addToast({text: 'Item saved successfully.'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const deleteBookItem = (bookItemId) => async (dispatch) => {
    await apiConfig.delete(`book-items/${bookItemId}`)
        .then((response) => {
            dispatch({type: bookItemActionType.DELETE_BOOK_ITEM, payload: bookItemId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};
