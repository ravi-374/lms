import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editBookAllotment, editBookAllotmentStatus} from '../../store/actions/bookAllotmentAction';
import {editMemberBookHistory, editMemberBookHistoryStatus} from '../../store/actions/memberBookHistoryAction';
import BookAllotmentForm from './BookAllotmentForm';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {bookAllotmentStatusConstant, bookStatusOptions} from '../../constants';
import moment from 'moment';
import {prepareFullNames} from "../../../shared/sharedMethod";
import {dateFormat} from "../../../constants";

const EditBookAllotment = (props) => {
    const {
        toggleModal, className,
        title, books, bookAllotment, onSelectBook, bookId, members, isMemberBookHistory, filterObject
    } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };
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
        status: bookStatusOptions.find(circular => circular.id === +bookAllotment.status)
    };

    useEffect(() => {
        props.fetchBooks();
        props.fetchMembers();
    }, []);

    const onSaveBookAllotment = (formValues) => {
        if (!isMemberBookHistory) {
            switch (formValues.status) {
                case bookAllotmentStatusConstant.BOOK_LOST:
                case bookAllotmentStatusConstant.BOOK_DAMAGED:
                    props.editBookAllotmentStatus(formValues, filterObject);
                    break;
                default:
                    props.editBookAllotment(formValues, filterObject);
                    break;
            }
        } else {
            switch (formValues.status) {
                case bookAllotmentStatusConstant.BOOK_LOST:
                case bookAllotmentStatusConstant.BOOK_DAMAGED:
                    props.editMemberBookHistoryStatus(formValues);
                    break;
                default:
                    props.editMemberBookHistory(formValues);
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
const mapStateToProps = (state) => {
    const { books, members } = state;
    return {
        books: books,
        members: prepareFullNames(members)
    }
};

export default connect(mapStateToProps, {
    editBookAllotment,
    editMemberBookHistory,
    editMemberBookHistoryStatus,
    editBookAllotmentStatus,
    fetchBooks,
    fetchMembers
})(EditBookAllotment);
