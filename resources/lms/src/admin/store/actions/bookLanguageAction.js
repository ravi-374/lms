import {bookLanguageActionType, apiBaseURL, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';

export const fetchBookLanguages = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.BOOK_LANGUAGE;
    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookLanguageActionType.FETCH_BOOK_LANGUAGES, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addBookLanguage = (language) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.BOOK_LANGUAGE, language)
        .then((response) => {
            dispatch({ type: bookLanguageActionType.ADD_BOOK_LANGUAGE, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookLanguage = (bookLanguageId, language) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.BOOK_LANGUAGE + '/' + bookLanguageId, language)
        .then((response) => {
            dispatch({ type: bookLanguageActionType.EDIT_BOOK_LANGUAGE, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookLanguage = (bookLanguageId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_LANGUAGE + '/' + bookLanguageId)
        .then((response) => {
            dispatch({ type: bookLanguageActionType.DELETE_BOOK_LANGUAGE, payload: bookLanguageId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
