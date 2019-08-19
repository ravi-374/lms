import React from 'react';
import {Button} from 'reactstrap';
import {bookAllotmentStatusConstant,} from '../../constants';
import {dateTimeFormatter} from '../../../shared/sharedMethod';
import BookStatus from "../../../shared/book-status/book-status";
import './BookHistory.scss';
import ReactDataTable from "../../../shared/table/ReactDataTable";

export default (props) => {
    const {
        bookHistory,
        onOpenModal,
        onChangeFilter,
        totalRecord,
        isLoading
    } = props;

    const columns = [
        {
            sortable: true,
            wrap: true,
            selector: 'name',
            name: 'Book',
            cell: row => row.book_item.book.name
        },
        {
            sortable: true,
            selector: 'book_code',
            width: '90px',
            name: 'Book Code',
            cell: row => row.book_item.book_code
        },
        {
            sortable: true,
            selector: 'issued_on',
            name: 'Issue Date',
            width: '150px',
            cell: row => renderDate(row.issued_on)
        },
        {
            sortable: true,
            selector: 'issued_due_on',
            name: 'Issue Due Date',
            width: '150px',
            cell: row => renderDate(row.issue_due_date)
        },
        {
            sortable: true,
            selector: 'reserved_on',
            name: 'Reserved Date',
            width: '150px',
            cell: row => renderDate(row.reserve_date)
        },
        {
            sortable: true,
            selector: 'return_due_date',
            name: 'Return Due Date',
            width: '150px',
            cell: row => renderDate(row.return_due_date)
        },
        {
            sortable: true,
            selector: 'return_date',
            name: 'Return Date',
            width: '150px',
            cell: row => renderDate(row.return_date)
        },
        {
            sortable: true,
            selector: 'status',
            name: 'Status',
            width: '100px',
            cell: row => renderBookStatus(row)
        },
        {
            name: 'Action',
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            width: '90px',
            cell: row => renderAction(row)
        }
    ];

    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory}/>
    };

    const renderAction = (bookHistory) => {
        if (bookHistory.status === bookAllotmentStatusConstant.BOOK_RESERVED) {
            return <Button size="sm" color="danger" onClick={(e) => {
                e.stopPropagation();
                onOpenModal(bookHistory)
            }}>
                Unreserve
            </Button>;
        }
        return '';
    };
    const renderDate = (date) => {
        return (
            <span>{date ? dateTimeFormatter(date) : ''}</span>
        );
    };
    return (
        <ReactDataTable items={bookHistory} columns={columns} loading={isLoading} totalRows={totalRecord}
                        onChange={onChangeFilter}/>
    );
};
