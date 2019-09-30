import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookAllotmentForm from './BookAllotmentForm';
import Modal from '../../../shared/components/Modal';
import {addBookAllotment} from '../../store/actions/bookAllotmentAction';

const CreateBookAllotment = (props) => {
    const {
        toggleModal, className, title,
        books, onSelectBook, bookId, members, filterObject, addBookAllotment
    } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };

    const onSaveBookAllotment = (formValues) => {
        addBookAllotment(formValues, filterObject);
    };

    const prepareFormOption = {
        onSaveBookAllotment,
        onCancel: toggleModal,
    };
    return <Modal {...modalOption} content={<BookAllotmentForm{...prepareFormOption} {...formOption}/>}/>
};

CreateBookAllotment.propTypes = {
    bookAllotment: PropTypes.object,
    filterObject: PropTypes.object,
    title: PropTypes.object,
    books: PropTypes.array,
    members: PropTypes.array,
    bookId: PropTypes.number,
    className: PropTypes.string,
    isMemberBookHistory: PropTypes.bool,
    addBookAllotment: PropTypes.func,
    editMemberBookHistory: PropTypes.func,
    editMemberBookHistoryStatus: PropTypes.func,
    editBookAllotmentStatus: PropTypes.func,
    onSelectBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookAllotment })(CreateBookAllotment);
