import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editTag} from '../../store/actions/tagAction';
import TagForm from './TagForm';

const EditTag = (props) => {
    const onSaveTag = (formValues) => {
        props.editTag(props.tag.id, formValues);
    };
    const prepareFormOption = {
        onSaveTag,
        onCancel: props.toggleModal,
        initialValues: {name: props.tag.name, description: props.tag.description}
    };
    return <Modal {...props} content={<TagForm {...prepareFormOption} />}/>
};

export default connect(null, {editTag})(EditTag);
