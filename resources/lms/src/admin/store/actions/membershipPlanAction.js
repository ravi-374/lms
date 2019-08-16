import {membershipPlanActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';

export const fetchMembershipPlans = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get('membership-plans')
        .then((response) => {
            dispatch({type: membershipPlanActionType.FETCH_MEMBERSHIP_PLANS, payload: response.data.data});
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const addMembershipPlan = (membershipPlan) => async (dispatch) => {
    await apiConfig.post('membership-plans', membershipPlan)
        .then((response) => {
            dispatch({type: membershipPlanActionType.ADD_MEMBERSHIP_PLAN, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const editMembershipPlan = (membershipPlanId, membershipPlan) => async (dispatch) => {
    await apiConfig.put(`membership-plans/${membershipPlanId}`, membershipPlan)
        .then((response) => {
            dispatch({type: membershipPlanActionType.EDIT_MEMBERSHIP_PLAN, payload: response.data.data});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};

export const deleteMembershipPlan = (membershipPlanId) => async (dispatch) => {
    await apiConfig.delete(`membership-plans/${membershipPlanId}`)
        .then((response) => {
            dispatch({type: membershipPlanActionType.DELETE_MEMBERSHIP_PLAN, payload: membershipPlanId});
            dispatch(addToast({text: response.data.message}));
            dispatch(toggleModal());
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: 'error'}));
        });
};
