import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {editGenre} from '../../store/actions/genreAction';
import GenreForm from './GenreForm';

const EditGenre = (props) => {
    const onSaveGenre = (formValues) => {
        props.editGenre(props.genre.id, formValues);
    };
    const prepareFormOption = {
        onSaveGenre,
        onCancel: props.toggleModal,
        initialValues: {name: props.genre.name, description: props.genre.description}
    };
    return <Modal {...props} content={<GenreForm {...prepareFormOption} />}/>
};

export default connect(null, {editGenre})(EditGenre);
