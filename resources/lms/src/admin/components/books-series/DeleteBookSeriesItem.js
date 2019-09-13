import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../../shared/components/Modal';
import {deleteBookSeries} from '../../store/actions/bookSeriesAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookSeries = (props) => {
    const {fields, seriesItems, items, setItems, index, setIndex, toggleModal} = props;
    const content = `Are you sure you want to delete "${ seriesItems && seriesItems[index].book_id && seriesItems[index].book_id.name ? seriesItems[index].book_id.name : seriesItems[index].sequence}" ?`;
    const title = "Delete A Book Series Item";
    const onDeleteBookSeries = () => {
        const valueArray = [...items];
        valueArray.splice(index, 1);
        setItems(valueArray);
        fields.remove(index);
        setIndex(null);
        toggleModal();
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookSeries} onCancel={props.toggleModal}/>}
                  content={content} title={title}/>;
};

export default connect(null, {deleteBookSeries})(DeleteBookSeries);
