import {bookActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchBooks = (history = null) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('books')
        .then((response) => {
            dispatch({type: bookActionType.FETCH_BOOKS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            if (response) {
                dispatch(addToast({text: response.data.message, type: 'error'}));
            } else if (history) {
                dispatch(addToast({text: 'Something went wrong !', type: 'error'}));
                history.push('/app/error');
            }
        });
};

export const fetchBook = (bookId, isLoading = true) => async (dispatch) => {
    dispatch(setLoading(isLoading));
    await apiConfig.get(`books/${bookId}`)
        .then((response) => {
            dispatch({type: bookActionType.FETCH_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addBook = (book, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post('books', book)
        .then((response) => {
            dispatch({type: bookActionType.ADD_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: response.data.message}));
            history.push('/app/books');
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editBook = (bookId, book, history = null) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(`books/${bookId}`, book)
        .then((response) => {
            dispatch({type: bookActionType.EDIT_BOOK, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: response.data.message}));
            if (history) {
                history.push('/app/books');
            } else {
                dispatch(toggleModal());
            }
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteBook = (bookId) => async (dispatch) => {
    await apiConfig.delete(`books/${bookId}`)
        .then((response) => {
            dispatch({type: bookActionType.DELETE_BOOK, payload: bookId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
