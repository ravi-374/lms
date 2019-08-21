import {bookLanguageActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

export const fetchBookLanguages = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get('book-languages')
        .then((response) => {
            dispatch({type: bookLanguageActionType.FETCH_BOOK_LANGUAGES, payload: response.data.data});
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addBookLanguage = (language) => async (dispatch) => {
    await apiConfig.post('book-languages', language)
        .then((response) => {
            dispatch({type: bookLanguageActionType.ADD_BOOK_LANGUAGE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editBookLanguage = (bookLanguageId, language) => async (dispatch) => {
    await apiConfig.put(`book-languages/${bookLanguageId}`, language)
        .then((response) => {
            dispatch({type: bookLanguageActionType.EDIT_BOOK_LANGUAGE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteBookLanguage = (bookLanguageId) => async (dispatch) => {
    await apiConfig.delete(`book-languages/${bookLanguageId}`)
        .then((response) => {
            dispatch({type: bookLanguageActionType.DELETE_BOOK_LANGUAGE, payload: bookLanguageId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
