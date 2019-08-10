import {genreActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

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
    await apiConfig.post('genres', genre)
        .then((response) => {
            dispatch({type: genreActionType.ADD_GENRE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editGenre = (genreId, genre) => async (dispatch) => {
    await apiConfig.put(`genres/${genreId}`, genre)
        .then((response) => {
            dispatch({type: genreActionType.EDIT_GENRE, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteGenre = (genreId) => async (dispatch) => {
    await apiConfig.delete(`genres/${genreId}`)
        .then((response) => {
            dispatch({type: genreActionType.DELETE_GENRE, payload: genreId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
