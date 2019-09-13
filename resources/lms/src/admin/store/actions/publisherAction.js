import {publisherActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';

export const fetchPublishers = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = 'publishers';

    if (!_.isEmpty(filter) && filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({type: publisherActionType.FETCH_PUBLISHERS, payload: response.data.data});
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addPublisher = (Publisher) => async (dispatch) => {
    await apiConfig.post('publishers', Publisher)
        .then((response) => {
            dispatch({type: publisherActionType.ADD_PUBLISHER, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
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
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deletePublisher = (publisherId) => async (dispatch) => {
    await apiConfig.delete(`publishers/${publisherId}`)
        .then((response) => {
            dispatch({type: publisherActionType.DELETE_PUBLISHER, payload: publisherId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
