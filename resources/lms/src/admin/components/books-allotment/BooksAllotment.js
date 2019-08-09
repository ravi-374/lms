import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import SearchField from '../../../shared/components/SearchField';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import BookAllotmentModal from './BookAllotmentModal';
import './BooksAllotment.scss';
import Toasts from '../../../shared/toast/Toasts';
import {toggleModal} from '../../../store/action/modalAction';
import {fetchBooksAllotment} from '../../store/actions/bookAllotmentAction';
import {fetchBooks} from '../../store/actions/bookAction';
import {fetchMembers} from '../../store/actions/memberAction';
import {dateTimeFormatter, prepareFullNames, timeFormatter} from '../../../shared/sharedMethod';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import TooltipItem from "../../../shared/tooltip/TolltipItem";
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";

const BooksAllotment = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [isDeleteMode, setDeleteMode] = useState(false);
    const [bookAllotment, setBookAllotment] = useState(null);
    const { booksAllotment, members, books, toggleModal, history, isLoading, totalRecord } = props;

    useEffect(() => {
        props.fetchMembers();
        props.fetchBooks();
    }, []);

    const cardModalProps = { bookAllotment, members, books, isEditMode, isDeleteMode, toggleModal };
    const onOpenModal = (isEdit, booksAllotment = null, isDelete = false) => {
        setEditMode(isEdit);
        setDeleteMode(isDelete);
        setBookAllotment(booksAllotment);
        toggleModal();
    };

    const fetchBooksAllotment = (filter) => {
        props.fetchBooksAllotment(filter);
    };

    const onChange = (filter) => {
        fetchBooksAllotment(filter);
    };

    const columns = [
        { name: 'Book', selector: 'book_item.book.name', sortable: true },
        {
            name: 'Book Item',
            selector: 'book_item.book_code',
            width: '120px',
            sortable: true
        },
        {
            name: 'Member',
            selector: 'member.first_name',
            width: '140px',
            sortable: true,
            cell: row => <span>{row.member.first_name + ' ' + row.member.last_name}</span>,
        },
        {
            name: 'Issue Date',
            selector: 'issued_on',
            width: '160px',
            sortable: true,
            cell: row => <span> {dateTimeFormatter(row.issued_on)}</span>
        },
        {
            name: 'Return Date',
            selector: 'return_date',
            width: '160px',
            sortable: true,
            cell: row => <span>{dateTimeFormatter(row.return_date)}</span>
        },
        {
            name: 'Status',
            width: '90px',
            center: true,
            selector: 'status',
            sortable: true,
            cell: row => <BookStatus status={row.status} item={row}/>
        },
        {
            name: 'Action',
            selector: 'id',
            right: true,
            cell: row => <ModalAction isHideDeleteIcon={true} onOpenModal={onOpenModal} item={row}/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title={'Books Allotments | LMS System'}/>
                <h5 className="page-heading">Books Allotment</h5>
                <div className="d-flex justify-content-end">
                    <SearchField/>
                    <Button onClick={() => onOpenModal(false)} size="md" color="primary ml-2">
                        New Book Allotment
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <ReactDataTable items={booksAllotment} columns={columns} loading={isLoading}
                                            totalRows={totalRecord} onOpenModal={onOpenModal} onChange={onChange}/>
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
    const { booksAllotment, members, books, isLoading, totalRecord } = state;
    let booksAllotmentArray = Object.values(booksAllotment);

    return {
        booksAllotment: booksAllotmentArray,
        members: prepareFullNames(Object.values(members)),
        books: Object.values(books),
        isLoading,
        totalRecord
    };
};

export default connect(mapStateToProps, {
    fetchBooksAllotment,
    fetchMembers,
    fetchBooks,
    toggleModal
})(BooksAllotment);
