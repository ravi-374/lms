import React from 'react';
import DeleteMembershipPlan from './DeleteMembershipPlan';
import CreateMembershipPlan from './CreateMembershipPlan';
import EditMembershipPlan from './EditMembershipPlan';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, membershipPlan} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'membership-plan-modal',
            title: isEditMode ? 'Edit Membership Plan' : 'Add New Membership Plan',
            toggleModal,
        };
        if (isEditMode) {
            return <EditMembershipPlan {...prepareModalOption} membershipPlan={membershipPlan}/>
        }
        return <CreateMembershipPlan {...prepareModalOption}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            membershipPlanId: membershipPlan.id,
            title: 'Delete Membership Plan',
            toggleModal,
            content: `Are you sure you want to delete ${membershipPlan.name} ?`,
        };
        return <DeleteMembershipPlan {...prepareModalOption}/>
    }
};
