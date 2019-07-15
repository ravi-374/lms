import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editPublisher} from '../../store/actions/publisherAction';
import PublisherForm from './PublisherForm';

const EditPublisher = (props) => {
    const onSavePublisher = (formValues) => {
        props.editPublisher(props.publisher.id, formValues);
    };
    const prepareFormOption = {
        onSavePublisher,
        onCancel: props.toggleModal,
        initialValues: {name: props.publisher.name, description: props.publisher.description}
    };
    return <Modal {...props} content={<PublisherForm {...prepareFormOption} />}/>
};

export default connect(null, {editPublisher})(EditPublisher);
