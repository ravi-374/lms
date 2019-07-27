import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {deleteBookSeries} from '../../store/actions/bookSeriesAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookSeries = (props) => {
    const content = `Are you sure you want to delete "${props.bookSeries ? props.bookSeries.name : ''}" ?`;
    const title = "Delete A Book Series";
    const onDeleteBookSeries = () => {
        props.deleteBookSeries(props.bookSeriesId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookSeries} onCancel={props.toggleModal} content={content} title={title}/>}/>
};

export default connect(null, {deleteBookSeries})(DeleteBookSeries);
