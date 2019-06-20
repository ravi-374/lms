import {genreActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchGenres = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('genres')
        .then((response) => {
            dispatch({type: genreActionType.FETCH_GENRES, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addGenre = (genre) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.post('genres', genre)
        .then((response) => {
            dispatch({type: genreActionType.ADD_GENRE, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: 'Genre Saved !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editGenre = (genreId, genre) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.put(`genres/${genreId}`, genre)
        .then((response) => {
            dispatch({type: genreActionType.EDIT_GENRE, payload: response.data.data});
            dispatch(setLoading(false));
            dispatch(addToast({text: 'Changes Saved !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteGenre = (genreId) => async (dispatch) => {
    await apiConfig.delete(`genres/${genreId}`)
        .then(() => {
            dispatch({type: genreActionType.DELETE_GENRE, payload: genreId});
            dispatch(addToast({text: 'Genre Deleted !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
