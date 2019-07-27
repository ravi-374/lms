import {membershipPlanActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';

export const fetchMembershipPlans = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get('membership-plans')
        .then((response) => {
            dispatch({type: membershipPlanActionType.FETCH_MEMBERSHIP_PLANS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};