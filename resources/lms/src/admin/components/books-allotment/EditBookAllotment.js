import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import BookAllotmentForm from './BookAllotmentForm';
import {dateFormat} from "../../../constants";
import {bookAllotmentStatusConstant, bookStatusOptions} from '../../constants';
import Modal from '../../../shared/components/Modal';
import {editBookAllotment, editBookAllotmentStatus} from '../../store/actions/bookAllotmentAction';
import {editMemberBookHistory, editMemberBookHistoryStatus} from '../../store/actions/memberBookHistoryAction';
import {getFormattedOptions} from "../../../shared/sharedMethod";

const EditBookAllotment = (props) => {
    const {
        toggleModal, className, editBookAllotmentStatus, editBookAllotment,
        editMemberBookHistoryStatus, editMemberBookHistory,
        title, bookAllotment, onSelectBook, bookId, isMemberBookHistory, filterObject
    } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { onSelectBook, bookId };
    const bookAllotmentStatusOptions = getFormattedOptions(bookStatusOptions);
    const { note, reserve_date, issued_on, return_date, member } = bookAllotment;
    const changeAbleFields = {
        book: bookAllotment.book_item.book,
        note,
        reserve_date: reserve_date ? moment(reserve_date, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        issued_on: issued_on ? moment(issued_on, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        return_date: return_date ? moment(return_date, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        book_item: {
            id: bookAllotment.book_item.id,
            name: bookAllotment.book_item.edition + ` (${bookAllotment.book_item.book_code})`
        },
        member: member ? { id: member.id, name: member.first_name + ' ' + member.last_name } : null,
        status: bookAllotmentStatusOptions.find(bookAllotmentStatus => bookAllotmentStatus.id === +bookAllotment.status)
    };

    const onSaveBookAllotment = (formValues) => {
        if (!isMemberBookHistory) {
            switch (formValues.status) {
                case bookAllotmentStatusConstant.BOOK_LOST:
                case bookAllotmentStatusConstant.BOOK_DAMAGED:
                    editBookAllotmentStatus(formValues, filterObject);
                    break;
                default:
                    editBookAllotment(formValues, filterObject);
                    break;
            }
        } else {
            switch (formValues.status) {
                case bookAllotmentStatusConstant.BOOK_LOST:
                case bookAllotmentStatusConstant.BOOK_DAMAGED:
                    editMemberBookHistoryStatus(formValues);
                    break;
                default:
                    editMemberBookHistory(formValues);
                    break;
            }
        }
    };

    const prepareFormOption = {
        onSaveBookAllotment,
        onCancel: toggleModal,
        initialValues: changeAbleFields
    };

    return <Modal {...modalOption} content={<BookAllotmentForm {...prepareFormOption} {...formOption} />}/>
};

EditBookAllotment.propTypes = {
    bookAllotment: PropTypes.object,
    filterObject: PropTypes.object,
    title: PropTypes.object,
    books: PropTypes.array,
    members: PropTypes.array,
    bookId: PropTypes.number,
    className: PropTypes.string,
    isMemberBookHistory: PropTypes.bool,
    editBookAllotment: PropTypes.func,
    editMemberBookHistory: PropTypes.func,
    editMemberBookHistoryStatus: PropTypes.func,
    editBookAllotmentStatus: PropTypes.func,
    fetchBooks: PropTypes.func,
    fetchMembers: PropTypes.func,
    onSelectBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, {
    editBookAllotment,
    editMemberBookHistory,
    editMemberBookHistoryStatus,
    editBookAllotmentStatus,
})(EditBookAllotment);
