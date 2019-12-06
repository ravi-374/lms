import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TestimonialForm from './TestimonialForm';
import Modal from '../../../shared/components/Modal';
import {prepareProfileData} from "../../../shared/sharedMethod";
import prepareTestimonialFormData from "./prepareTestimonialFormData";
import {editTestimonial} from "../../store/actions/testimonialAction";

const EditTestimonial = (props) => {
    const { testimonial, editTestimonial, toggleModal } = props;

    const onSaveTestimonial = (formValues) => {
        editTestimonial(testimonial.id, prepareTestimonialFormData(formValues));
    };

    const prepareFormOption = {
        onSaveTestimonial,
        onCancel: toggleModal,
        initialValues: prepareProfileData(testimonial),
    };

    return <Modal {...props} content={<TestimonialForm {...prepareFormOption}/>}/>
};

EditTestimonial.propTypes = {
    testimonial: PropTypes.object,
    editTestimonial: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editTestimonial })(EditTestimonial);
