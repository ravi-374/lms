import React from 'react';
import {Button, Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import {bookAllotmentStatusConstant,} from '../../constants';
import {dateFormatter, timeFormatter} from '../../../shared/sharedMethod';
import BookStatus from "../../../shared/book-status/book-status";
import './BookHistory.scss';
import TooltipItem from "../../../shared/tooltip/TolltipItem";

export default ({ bookHistory, sortAction, sortObject, onOpenModal }) => {
    const headers = [
        { id: 'book_name', name: 'Book' },
        { id: 'book_code', name: 'Book Code' },
        { id: 'issued_on', name: 'Issue Date' },
        { id: 'reserved_on', name: 'Reserved Date' },
        { id: 'issued_due_on', name: 'Issue Due Date' },
        { id: 'return_due_date', name: 'Return Due Date' },
        { id: 'return_date', name: 'Return Date' },
        { id: 'status_name', name: 'Status' },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };

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
    const renderDate = (id, date) => {
        return (
            <span>
                <span id={id}>{date ? dateFormatter(date) : ''}</span>
                <TooltipItem key={id.toString()} tooltip={date ? timeFormatter(date) : ''} target={id}/>
            </span>
        );
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader {...headerProps}/>
            </thead>
            <tbody>
            {bookHistory.map((history) => {
                    return (
                        <tr key={history.id.toString()}>
                            <td className="book-name">{history.book_item.book.name}</td>
                            <td>{history.book_item.book_code}</td>
                            <td>{renderDate('custom-tooltip-' + history.id, history.issued_on)}</td>
                            <td>{renderDate('reserve-date-' + history.id, history.reserve_date)}</td>
                            <td>{history.issue_due_date ? dateFormatter(history.issue_due_date) : ' '}</td>
                            <td>{history.return_due_date ? dateFormatter(history.return_due_date) : ' '}</td>
                            <td>{renderDate('return-date-' + history.id, history.return_date)}</td>
                            <td className="text-center book-return-date">{renderBookStatus(history)}</td>
                            <td className="text-center book-action">{renderAction(history)}</td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
