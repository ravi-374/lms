import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteTag} from '../../store/actions/tagAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteTag = (props) => {
    const onDeleteTag = () => {
        props.deleteTag(props.tagId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteTag} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteTag})(DeleteTag);
