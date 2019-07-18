import {circulationActionType, toastType,circularStatusConstant} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchCirculations = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('books-history')
        .then((response) => {
            dispatch({type: circulationActionType.FETCH_CIRCULATIONS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const addCirculation = (circulation) => async (dispatch) => {
    await apiConfig.post(`books/${circulation.book_item_id}/${getApiRoute(circulation.status)}`, circulation)
        .then((response) => {
            dispatch({type: circulationActionType.ADD_CIRCULATION, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const editCirculation = (circulation) => async (dispatch) => {
    await apiConfig.post(`books/${circulation.book_item_id}/${getApiRoute(circulation.status)}`, circulation)
        .then((response) => {
            dispatch({type: circulationActionType.EDIT_CIRCULATION, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

export const deleteCirculation = (circulationId) => async (dispatch) => {
    await apiConfig.delete(`circulations/${circulationId}`)
        .then((response) => {
            dispatch({type: circulationActionType.DELETE_CIRCULATION, payload: circulationId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};

const getApiRoute = (status) => {
    switch (status) {
        case circularStatusConstant.BOOK_RESERVED:
            return 'reserve-book';
        case circularStatusConstant.BOOK_ISSUED:
            return 'issue-book';
        default:
            return 'return-book';
    }
};
