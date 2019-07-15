import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteBookSeries} from '../../store/actions/bookSeriesAction';
import DeleteAction from '../../shared/action-buttons/DeleteAction';

const DeleteBookSeries = (props) => {
    const onDeleteBookSeries = () => {
        props.deleteBookSeries(props.bookSeriesId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookSeries} onCancel={props.toggleModal}/>}/>
};

export default connect(null, {deleteBookSeries})(DeleteBookSeries);
