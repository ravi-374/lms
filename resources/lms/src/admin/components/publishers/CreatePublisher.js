import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PublisherForm from './PublisherForm';
import Modal from '../../../shared/components/Modal';
import {addPublisher} from '../../store/actions/publisherAction';

const CreatePublisher = (props) => {
    const { addPublisher, toggleModal } = props;

    const onSavePublisher = (formValues) => {
        addPublisher(formValues);
    };
    const prepareFormOption = {
        onSavePublisher,
        onCancel: toggleModal,
    };
    return <Modal {...props} content={<PublisherForm{...prepareFormOption}/>}/>
};

CreatePublisher.propTypes = {
    addPublisher: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addPublisher })(CreatePublisher);
