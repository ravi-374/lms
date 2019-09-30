import React from 'react';
import PropTypes from 'prop-types';
import CreateBookAllotment from './CreateBookAllotment';
import EditBookAllotment from './EditBookAllotment';
import DeleteBookAllotment from './DeleteBookAllotment';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const BookAllotmentModal = (props) => {
    const { bookAllotment, filterObject, isCreate, isEdit, isDelete } = props;
    const editConfig = { bookAllotment, filterObject };
    const delConfig = { bookAllotmentId: bookAllotment ? bookAllotment.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'books-allotment.input.new-btn.label',
            'books-allotment.modal.edit.title', 'books-allotment.modal.delete.title'),
        NewComponent: CreateBookAllotment,
        EditComponent: EditBookAllotment,
        DeleteComponent: DeleteBookAllotment,
        deleteKey: bookAllotment ? bookAllotment.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

BookAllotmentModal.propTypes = {
    bookAllotment: PropTypes.object,
    filterObject: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default BookAllotmentModal;
