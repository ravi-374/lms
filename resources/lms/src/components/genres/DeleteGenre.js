import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteGenre} from '../../store/actions/genreAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteGenre = (props) => {
    const onDeleteGenre = () => {
        props.deleteGenre(props.genreId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteGenre} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteGenre})(DeleteGenre);
