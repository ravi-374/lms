import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteMember} from '../../store/actions/memberAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteMember = (props) => {
    const onDeleteMember = () => {
        props.deleteMember(props.memberId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteMember} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteMember})(DeleteMember);
