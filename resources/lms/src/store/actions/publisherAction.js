import {publisherActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from './progressBarAction';
import {addToast} from './toastAction';
import {toggleModal} from './modalAction';

export const fetchPublishers = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('publishers')
        .then((response) => {
            dispatch({type: publisherActionType.FETCH_PUBLISHERS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addPublisher = (Publisher) => async (dispatch) => {
    await apiConfig.post('publishers', Publisher)
        .then((response) => {
            dispatch({type: publisherActionType.ADD_PUBLISHER, payload: response.data.data});
            dispatch(addToast({text: 'Publisher Saved !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editPublisher = (publisherId, publisher) => async (dispatch) => {
    await apiConfig.put(`publishers/${publisherId}`, publisher)
        .then((response) => {
            dispatch({type: publisherActionType.EDIT_PUBLISHER, payload: response.data.data});
            dispatch(addToast({text: 'Publisher Updated !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deletePublisher = (publisherId) => async (dispatch) => {
    await apiConfig.delete(`publishers/${publisherId}`)
        .then(() => {
            dispatch({type: publisherActionType.DELETE_PUBLISHER, payload: publisherId});
            dispatch(addToast({text: 'Publisher Deleted !'}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
