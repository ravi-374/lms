import React from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import ConfirmAction from '../../../shared/action-buttons/ConfirmAction';
import {unReserveBook} from "../../store/actions/bookHistoryAction";

const UnReserveBook = (props) => {
    const name = props.history ? props.history.book_item.book.name : '';
    const code = props.history ? props.history.book_item.book_code : '';
    const content = `Are you sure you want to unreserve "${name} (${code})" ?`;
    const title = "Unreserve a book";
    const unReserveBook = () => {
        props.unReserveBook(props.history.book_item.id);
    };
    return <Modal {...props} actions={<ConfirmAction onConfirm={unReserveBook} onCancel={props.toggleModal}/>}
                  content={content} title={title}/>;

};

export default connect(null, { unReserveBook })(UnReserveBook);
