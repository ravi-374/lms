import React from 'react';
import {Button, Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import {bookAllotmentStatusConstant,} from '../../constants';
import {dateFormatter} from '../../../shared/sharedMethod';
import BookStatus from "../../../shared/book-status/book-status";

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

    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader {...headerProps}/>
            </thead>
            <tbody>
            {bookHistory.map((history) => {
                    return (
                        <tr key={history.id.toString()}>
                            <td>{history.book_item.book.name}</td>
                            <td>{history.book_item.book_code}</td>
                            <td>{history.issued_on ? dateFormatter(history.issued_on) : ' '}</td>
                            <td>{history.reserve_date ? dateFormatter(history.reserve_date) : ' '}</td>
                            <td>{history.issue_due_date ? dateFormatter(history.issue_due_date) : ' '}</td>
                            <td>{history.return_due_date ? dateFormatter(history.return_due_date) : ' '}</td>
                            <td>{history.return_date ? dateFormatter(history.return_date) : ' '}</td>
                            <td className="text-center" style={{ width: '100px' }}>{renderBookStatus(history)}</td>
                            <td className="text-center" style={{ width: '90px' }}>{renderAction(history)}</td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
