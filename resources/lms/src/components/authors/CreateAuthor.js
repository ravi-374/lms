import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addAuthor} from '../../store/actions/authorAction';
import AuthorForm from './AuthorForm';

const CreateAuthor = (props) => {
    const onSaveAuthor = (formValues) => {
        props.addAuthor(formValues);
    };
    const prepareFormOption = {
        onSaveAuthor,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<AuthorForm{...prepareFormOption}/>}/>
};

export default connect(null, {addAuthor})(CreateAuthor);
