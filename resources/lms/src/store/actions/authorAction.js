import {authorActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchAuthors = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('authors')
        .then((response) => {
            dispatch({type: authorActionType.FETCH_AUTHORS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addAuthor = (author) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.post('authors', author)
        .then((response) => {
            dispatch({type: authorActionType.ADD_AUTHOR, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: 'Author Saved !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editAuthor = (authorId, author) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.put(`authors/${authorId}`, author)
        .then((response) => {
            dispatch({type: authorActionType.EDIT_AUTHOR, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: 'Author Updated !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteAuthor = (authorId) => async (dispatch) => {
    await apiConfig.delete(`authors/${authorId}`)
        .then(() => {
            dispatch({type: authorActionType.DELETE_AUTHOR, payload: authorId});
            dispatch(addToast({text: 'Author Deleted !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
