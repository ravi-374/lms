import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {deleteBookLanguage} from '../../store/actions/bookLanguageAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookLanguage = (props) => {
    const onDeleteLanguage= () => {
        props.deleteBookLanguage(props.bookLanguageId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteLanguage} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteBookLanguage})(DeleteBookLanguage);
