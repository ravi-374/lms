import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addBookLanguage} from '../../store/actions/bookLanguageAction';
import BookLanguageForm from './BookLanguageForm';

const CreateBookLanguage = (props) => {
    const onSaveBookLanguage = (formValues) => {
        props.addBookLanguage(formValues);
    };
    const prepareFormOption = {
        onSaveBookLanguage,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<BookLanguageForm{...prepareFormOption}/>}/>
};

export default connect(null, {addBookLanguage})(CreateBookLanguage);
