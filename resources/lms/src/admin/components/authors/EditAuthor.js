import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editAuthor} from '../../store/actions/authorAction';
import AuthorForm from './AuthorForm';

const EditAuthor = (props) => {
    const onSaveAuthor = (formValues) => {
        props.editAuthor(props.author.id, formValues);
    };
    const prepareFormOption = {
        onSaveAuthor,
        onCancel: props.toggleModal,
        initialValues: {
            first_name: props.author.first_name,
            last_name: props.author.last_name,
            description: props.author.description
        }
    };
    return <Modal {...props} content={<AuthorForm {...prepareFormOption} />}/>
};

export default connect(null, {editAuthor})(EditAuthor);
