import React from 'react';
import DeleteMember from './DeleteMember';
import CreateMember from './CreateMember';
import EditMember from './EditMember';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, isCreateMode, member, membershipPlans} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'member-modal',
            title: isEditMode ? 'Edit Member' : 'New Member',
            toggleModal,
        };
        if (isEditMode) {
            return <EditMember {...prepareModalOption} member={member} membershipPlans={membershipPlans}/>
        }
        if (isCreateMode) {
            return <CreateMember {...prepareModalOption} membershipPlans={membershipPlans}/>
        }
        return null;
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            memberId: member.id,
            title: 'Delete Member',
            toggleModal,
            content: `Are you sure you want to delete "${member.name}" ?`,
        };
        return <DeleteMember {...prepareModalOption}/>
    }
};
