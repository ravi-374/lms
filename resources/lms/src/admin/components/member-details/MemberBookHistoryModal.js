import React from 'react';
import PropTypes from 'prop-types';
import EditBookAllotment from '../books-allotment/EditBookAllotment';
import EditMember from '../members/EditMember';
import DeleteBookAllotment from '../books-allotment/DeleteBookAllotment';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const MemberBookHistoryModal =  (props) => {
    const { bookHistory, isCreate, isEdit, isDelete, member } = props;
    const addConfig = { member };
    const editConfig = { bookAllotment: bookHistory, isMemberBookHistory: true };
    const delConfig = { bookAllotmentId: bookHistory ? bookHistory.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'members.edit-member-details.title',
            'books-allotment.modal.edit.title', 'books-allotment.modal.delete.title'),
        NewComponent: EditMember,
        EditComponent: EditBookAllotment,
        DeleteComponent: DeleteBookAllotment,
        deleteKey: member ? member.first_name + ' ' + member.last_name : null,
        addConfig,
        editConfig,
        delConfig,
        isWide: isCreate ? isCreate : null,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

MemberBookHistoryModal.propTypes = {
    bookHistory: PropTypes.object,
    member: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default MemberBookHistoryModal;
