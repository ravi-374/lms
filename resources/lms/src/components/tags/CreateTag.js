import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addTag} from '../../store/actions/tagAction';
import TagForm from './TagForm';

const CreateTag = (props) => {
    const onSaveTag = (formValues) => {
        props.addTag(formValues);
    };
    const prepareFormOption = {
        onSaveTag,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<TagForm{...prepareFormOption}/>}/>
};

export default connect(null, {addTag})(CreateTag);
