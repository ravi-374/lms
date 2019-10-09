import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookCirculationForm from './BookCirculationForm';
import Modal from '../../../shared/components/Modal';
import {addBookCirculation} from '../../store/actions/bookCirculationAction';

const CreateBookCirculation = (props) => {
    const {
        toggleModal, className, title,
        books, onSelectBook, bookId, members, filterObject, addBookCirculation
    } = props;
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };

    const onSaveBookCirculation = (formValues) => {
        addBookCirculation(formValues, filterObject);
    };

    const prepareFormOption = {
        onSaveBookCirculation,
        onCancel: toggleModal,
    };
    return <Modal {...modalOption} content={<BookCirculationForm{...prepareFormOption} {...formOption}/>}/>
};

CreateBookCirculation.propTypes = {
    bookCirculation: PropTypes.object,
    filterObject: PropTypes.object,
    title: PropTypes.object,
    books: PropTypes.array,
    members: PropTypes.array,
    bookId: PropTypes.number,
    className: PropTypes.string,
    isMemberBookHistory: PropTypes.bool,
    addBookCirculation: PropTypes.func,
    editMemberBookHistory: PropTypes.func,
    editMemberBookHistoryStatus: PropTypes.func,
    editBookCirculationStatus: PropTypes.func,
    onSelectBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookCirculation: addBookCirculation })(CreateBookCirculation);
