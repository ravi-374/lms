import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addPublisher} from '../../store/actions/publisherAction';
import PublisherForm from './PublisherForm';

const CreatePublisher = (props) => {
    const onSavePublisher = (formValues) => {
        props.addPublisher(formValues);
    };
    const prepareFormOption = {
        onSavePublisher,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<PublisherForm{...prepareFormOption}/>}/>
};

export default connect(null, {addPublisher})(CreatePublisher);
