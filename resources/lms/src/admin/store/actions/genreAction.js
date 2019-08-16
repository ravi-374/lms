import {genreActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';

export const fetchGenres = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = 'genres';

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: genreActionType.FETCH_GENRES, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const addGenre = (genre) => async (dispatch) => {
    await apiConfig.post('genres', genre)
        .then((response) => {
            dispatch({ type: genreActionType.ADD_GENRE, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const editGenre = (genreId, genre) => async (dispatch) => {
    await apiConfig.put(`genres/${genreId}`, genre)
        .then((response) => {
            dispatch({ type: genreActionType.EDIT_GENRE, payload: response.data.data });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};

export const deleteGenre = (genreId) => async (dispatch) => {
    await apiConfig.delete(`genres/${genreId}`)
        .then((response) => {
            dispatch({ type: genreActionType.DELETE_GENRE, payload: genreId });
            dispatch(addToast({ text: response.data.message }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: 'error' }));
        });
};
