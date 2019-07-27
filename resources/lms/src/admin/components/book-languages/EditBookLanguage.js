import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editBookLanguage} from '../../store/actions/bookLanguageAction';
import BookLanguageForm from './BookLanguageForm';

const EditBookLanguage = (props) => {
    const onSaveBookLanguage = (formValues) => {
        props.editBookLanguage(props.bookLanguage.id, formValues);
    };
    const prepareFormOption = {
        onSaveBookLanguage,
        onCancel: props.toggleModal,
        initialValues: {language_name: props.bookLanguage.language_name,language_code: props.bookLanguage.language_code}
    };
    return <Modal {...props} content={<BookLanguageForm {...prepareFormOption} />}/>
};

export default connect(null, {editBookLanguage})(EditBookLanguage);
