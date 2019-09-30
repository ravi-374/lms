import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookAllotmentModal from './BookAllotmentModal';
import './BooksAllotment.scss';
import {Routes} from "../../../constants";
import {bookAllotmentFilterOptions, storageKey} from "../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import Toasts from '../../../shared/toast/Toasts';
import {dateFormatter, getFormattedMessage, getFormattedOptions} from '../../../shared/sharedMethod';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksAllotment} from '../../store/actions/bookAllotmentAction';

const BooksAllotment = (props) => {
    const { booksAllotment, fetchBooksAllotment, toggleModal, history, isLoading, totalRecord } = props;
    const [filterObject, setFilterObject] = useState(null);
    const [isCreate, isEdit, isDelete, bookAllotment, onOpenModal] = openModal();
    const cardModalProps = { bookAllotment, filterObject, isCreate, isEdit, isDelete, toggleModal };
    const bookAllotmentStatusFilter = getFormattedOptions(bookAllotmentFilterOptions);

    const onChange = (filter) => {
        setFilterObject(filter);
        fetchBooksAllotment(filter);
    };

    const onClickModal = (isEdit, booksAllotment = null, isDelete = false) => {
        onOpenModal(isEdit, booksAllotment, isDelete);
        toggleModal();
    };

    const gotToBookHistoryDetail = (bookAllotmentId) => {
        history.push(`${Routes.BOOK_ALLOTMENTS + bookAllotmentId}/details`);
    };

    const getStoredFilterKey = () => {
        const item = JSON.parse(localStorage.getItem(storageKey.BOOK_ALLOTMENT));
        if (item) {
            const bookAllotment = bookAllotmentStatusFilter.find(bookAllotment => bookAllotment.id === item.id);
            if (bookAllotment) {
                return bookAllotment;
            }
        }
        return bookAllotmentStatusFilter[0];
    };

    const columns = [
        {
            name: getFormattedMessage('books-allotment.select.book.label'),
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: getFormattedMessage('books-allotment.select.book-item.label'),
            selector: 'book_code',
            width: '140px',
            sortable: true,
            cell: row => row.book_code = row.book_item.book_code
        },
        {
            name: getFormattedMessage('books-allotment.select.member.label'),
            selector: 'member_name',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.first_name + ' ' + row.member.last_name}</span>
        },
        {
            name: getFormattedMessage('books-allotment.table.issue-date.column'),
            selector: 'issued_on',
            width: '160px',
            sortable: true,
            cell: row => <span>{dateFormatter(row.issued_on)}</span>
        },
        {
            name: getFormattedMessage('books-allotment.table.return-date.column'),
            selector: 'return_date',
            width: '160px',
            sortable: true,
            cell: row => <span>{dateFormatter(row.return_date)} </span>
        },
        {
            name: getFormattedMessage('react-data-table.status.column'),
            width: '100px',
            selector: 'status',
            center: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: getFormattedMessage('react-data-table.action.column'),
            selector: 'id',
            right: true,
            cell: row => <ModalAction isHideDeleteIcon={true} isHideDetailIcon={false}
                                      goToDetailScreen={gotToBookHistoryDetail} onOpenModal={onClickModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Books Allotments"/>
                <h5 className="page-heading">{getFormattedMessage('books-allotment.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('books-allotment.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={booksAllotment} isShowFilterField
                                            emptyStateMessageId="books-allotment.empty-state.title"
                                            filterKeyName={storageKey.BOOK_ALLOTMENT}
                                            filterOptions={bookAllotmentStatusFilter} filterKey={getStoredFilterKey()}
                                            columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onChange={onChange}/>
                            <BookAllotmentModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

BooksAllotment.propTypes = {
    history: PropTypes.object,
    booksAllotment: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBooksAllotment: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { booksAllotment, isLoading, totalRecord } = state;
    return { booksAllotment, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchBooksAllotment, toggleModal })(BooksAllotment);
