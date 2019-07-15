import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editBookSeries} from '../../store/actions/bookSeriesAction';
import BookSeriesForm from './BookSeriesForm';

const EditBookSeries = (props) => {
    const onSaveBookSeries = (formValues) => {
        props.editBookSeries(props.bookSeries.id, formValues);
    };
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: props.toggleModal,
        initialValues: {title: props.bookSeries.title}
    };
    return <Modal {...props} content={<BookSeriesForm {...prepareFormOption} />}/>
};

export default connect(null, {editBookSeries})(EditBookSeries);
