import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import BookAllotmentModal from './BookAllotmentModal';
import './BooksAllotment.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksAllotment} from '../../store/actions/bookAllotmentAction';
import {dateFormatter} from '../../../shared/sharedMethod';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {Routes} from "../../../constants";
import {bookAllotmentFilterOptions, storageKey} from "../../constants";

const BooksAllotment = (props) => {
    const [isCreateMode, setCreateMode] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookAllotment, setBookAllotment] = useState(null);
    const { booksAllotment, members, books, toggleModal, history, isLoading, totalRecord, appName, appLogo } = props;
    const [filterObject, setFilterObject] = useState(null);
    const onOpenModal = (isEdit, booksAllotment = null, isDelete = false) => {
        setCreateMode(!isEdit);
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookAllotment(booksAllotment);
        toggleModal();
    };

    const onChange = (filter) => {
        setFilterObject(filter);
        props.fetchBooksAllotment(filter);
    };

    const gotToBookHistoryDetail = (bookAllotmentId) => {
        history.push(`${Routes.BOOK_ALLOTMENTS + bookAllotmentId}/details`);
    };
    const cardModalProps = {
        bookAllotment,
        members,
        books,
        isEditMode,
        isDeleteMode,
        isCreateMode,
        toggleModal,
        filterObject
    };
    const columns = [
        {
            name: 'Book',
            selector: 'name',
            sortable: true,
            wrap: true,
            cell: row => row.name = row.book_item.book.name
        },
        {
            name: 'Book Item',
            selector: 'book_code',
            width: '120px',
            sortable: true,
            cell: row => row.book_code = row.book_item.book_code
        },
        {
            name: 'Member',
            selector: 'member_name',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.first_name + ' ' + row.member.last_name}</span>
        },
        {
            name: 'Issue Date',
            selector: 'issued_on',
            width: '160px',
            sortable: true,
            cell: row => <span>{dateFormatter(row.issued_on)}</span>
        },
        {
            name: 'Return Date',
            selector: 'return_date',
            width: '160px',
            sortable: true,
            cell: row => <span>{dateFormatter(row.return_date)} </span>
        },
        {
            name: 'Status',
            width: '100px',
            selector: 'status',
            center: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: 'Action',
            selector: 'id',
            right: true,
            cell: row => <ModalAction isHideDeleteIcon={true} isHideDetailIcon={false}
                                      goToDetailScreen={gotToBookHistoryDetail} onOpenModal={onOpenModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const getStoredFilterKey = () => {
        const item = JSON.parse(localStorage.getItem(storageKey.BOOK_ALLOTMENT));
        if (item) {
            const bookAllotment = bookAllotmentFilterOptions.find(bookAllotment => bookAllotment.id === item.id);
            if (bookAllotment) {
                return bookAllotment;
            }
        }
        return bookAllotmentFilterOptions[1];
    };
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle appLogo={appLogo} title={`Books Allotments | ${appName}`}/>
                <h5 className="page-heading">Books Allotment</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Book Allotment
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={booksAllotment} isShowFilterField
                                            filterKeyName={storageKey.BOOK_ALLOTMENT}
                                            filterOptions={bookAllotmentFilterOptions} filterKey={getStoredFilterKey()}
                                            columns={columns} loading={isLoading} totalRows={totalRecord}
                                            onOpenModal={onOpenModal} onChange={onChange}/>
                            <BookAllotmentModal {...cardModalProps}/>
                            <Toasts/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { booksAllotment, isLoading, totalRecord } = state;
    return {
        booksAllotment, isLoading, totalRecord
    };
};

export default connect(mapStateToProps, {
    fetchBooksAllotment,
    toggleModal
})(BooksAllotment);
