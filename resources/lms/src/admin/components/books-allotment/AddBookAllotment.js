import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {addBookAllotment} from '../../store/actions/bookAllotmentAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import BookAllotmentForm from './BookAllotmentForm';
import {prepareFullNames} from "../../../shared/sharedMethod";

const CreateBookAllotment = (props) => {
    const { toggleModal, className, title, books, onSelectBook, bookId, members } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };

    useEffect(() => {
        props.fetchBooks();
        props.fetchMembers();
    }, []);

    const onSaveBookAllotment = (formValues) => {
        props.addBookAllotment(formValues);
    };

    const prepareFormOption = {
        onSaveBookAllotment,
        onCancel: props.toggleModal,
    };
    return <Modal {...modalOption} content={<BookAllotmentForm{...prepareFormOption} {...formOption}/>}/>
};

const mapStateToProps = (state) => {
    const { books, members } = state;
    return {
        books: Object.values(books),
        members: prepareFullNames(Object.values(members))
    }
};
export default connect(mapStateToProps, { addBookAllotment, fetchBooks, fetchMembers })(CreateBookAllotment);
