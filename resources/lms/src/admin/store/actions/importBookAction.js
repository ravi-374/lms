import {importActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {apiBaseURL} from "../../../constants";

export const clearImportBook = () => async (dispatch) => {
    dispatch({ type: importActionType.CLEAR_IMPORT_BOOK, payload: {} });
};

export const fetchImportBook = (isbn) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.BOOK_DETAILS, { params: { 'isbn': isbn } }).then((response) => {
        dispatch({ type: importActionType.FETCH_IMPORT_BOOK, payload: response.data });
        dispatch(setLoading(false));
    }).catch(({ response }) => {
        dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        dispatch(setLoading(false));
    });
};
