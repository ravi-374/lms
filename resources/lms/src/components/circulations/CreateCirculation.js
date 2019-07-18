import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addCirculation} from '../../store/actions/circulationAction';
import CirculationForm from './CirculationForm';

const CreateCirculation = (props) => {
    const {toggleModal, className, title, books, onSelectBook, bookId, members} = props;
    const modalOption = {toggleModal, className, title};
    const formOption = {books, onSelectBook, bookId, members};
    const onSaveCirculation = (formValues) => {
        props.addCirculation(formValues);
    };
    const prepareFormOption = {
        onSaveCirculation,
        onCancel: props.toggleModal,
    };
    return <Modal {...modalOption} content={<CirculationForm{...prepareFormOption} {...formOption}/>}/>
};

export default connect(null, {addCirculation})(CreateCirculation);
