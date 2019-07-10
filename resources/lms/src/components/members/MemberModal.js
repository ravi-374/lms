import React from 'react';
import DeleteMember from './DeleteMember';
import CreateMember from './CreateMember';
import EditMember from './EditMember';

export default (props) => {
    const {isEditMode, toggleModal, isDeleteMode, member, membershipPlans} = props;
    if (!isDeleteMode) {
        const prepareModalOption = {
            className: 'member-modal',
            title: isEditMode ? 'Edit Member' : 'Add New Member',
            toggleModal,
        };
        if (isEditMode) {
            return <EditMember {...prepareModalOption} member={member} membershipPlans={membershipPlans}/>
        }
        return <CreateMember {...prepareModalOption} membershipPlans={membershipPlans}/>
    }
    if (isDeleteMode) {
        const prepareModalOption = {
            memberId: member.id,
            title: 'Delete Member',
            toggleModal,
            content: `Are you sure you want to delete ${member.name} ?`,
        };
        return <DeleteMember {...prepareModalOption}/>
    }
};
