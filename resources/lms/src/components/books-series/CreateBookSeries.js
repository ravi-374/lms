import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addBookSeries} from '../../store/actions/bookSeriesAction';
import BookSeriesForm from './BookSeriesForm';

const CreateBookSeries = (props) => {
    const onSaveBookSeries = (formValues) => {
        props.addBookSeries(formValues);
    };
    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: props.toggleModal,
    };
    return <Modal {...props} content={<BookSeriesForm{...prepareFormOption}/>}/>
};

export default connect(null, {addBookSeries})(CreateBookSeries);
