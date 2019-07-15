import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addGenre} from '../../store/actions/genreAction';
import GenreForm from './GenreForm';

const CreateGenre = (props) => {
    const onSaveGenre = (formValues) => {
        props.addGenre(formValues);
    };
    const prepareFormOption = {
        onSaveGenre,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<GenreForm{...prepareFormOption}/>}/>
};

export default connect(null, {addGenre})(CreateGenre);
