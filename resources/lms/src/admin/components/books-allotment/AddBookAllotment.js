import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addBookAllotment} from '../../store/actions/bookAllotmentAction';
import BookAllotmentForm from './BookAllotmentForm';

const CreateBookAllotment = (props) => {
    const {toggleModal, className, title, books, onSelectBook, bookId, members} = props;
    const modalOption = {toggleModal, className, title};
    const formOption = {books, onSelectBook, bookId, members};
    const onSaveBookAllotment = (formValues) => {
        props.addBookAllotment(formValues);
    };
    const prepareFormOption = {
        onSaveBookAllotment,
        onCancel: props.toggleModal,
    };
    return <Modal {...modalOption} content={<BookAllotmentForm{...prepareFormOption} {...formOption}/>}/>
};

export default connect(null, {addBookAllotment})(CreateBookAllotment);
