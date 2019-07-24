import {bookSeriesActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchBooksSeries = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('book-series')
        .then((response) => {
            dispatch({type: bookSeriesActionType.FETCH_BOOKS_SERIES, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const fetchBookSeries = (bookSeriesId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`book-series/${bookSeriesId}`)
        .then((response) => {
            dispatch({type: bookSeriesActionType.FETCH_BOOK_SERIES, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addBookSeries = (bookSeries, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.post('book-series', bookSeries)
        .then((response) => {
            dispatch({type: bookSeriesActionType.ADD_BOOK_SERIES, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(setLoading(false));
            history.push('/app/admin/books-series');
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editBookSeries = (bookSeriesId, bookSeries, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.put(`book-series/${bookSeriesId}`, bookSeries)
        .then((response) => {
            dispatch({type: bookSeriesActionType.EDIT_BOOK_SERIES, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(setLoading(false));
            history.push('/app/admin/books-series');
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteBookSeries = (bookSeriesId) => async (dispatch) => {
    await apiConfig.delete(`book-series/${bookSeriesId}`)
        .then((response) => {
            dispatch({type: bookSeriesActionType.DELETE_BOOK_SERIES, payload: bookSeriesId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
