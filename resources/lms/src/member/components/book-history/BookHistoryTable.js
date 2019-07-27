import React from 'react';
import {Badge, Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import {bookAllotmentStatusConstant} from '../../constants';
import {dateFormatter} from '../../../shared/sharedMethod';

export default ({ bookHistory, sortAction, sortObject }) => {
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
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    const renderBookStatus = (bookHistory) => {
        switch (bookHistory.status) {
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                bookHistory.status_name = 'Issued';
                return <Badge color="success">Issued</Badge>;
            case bookAllotmentStatusConstant.BOOK_RETURNED:
                bookHistory.status_name = 'Returned';
                return <Badge color="secondary">Returned</Badge>;
            case bookAllotmentStatusConstant.BOOK_LOST:
                bookHistory.status_name = 'Lost';
                return <Badge color="secondary">Lost</Badge>;
            case bookAllotmentStatusConstant.BOOK_DAMAGED:
                bookHistory.status_name = 'Damaged';
                return <Badge color="secondary">Damaged</Badge>;
            default:
                bookHistory.status_name = 'Reserved';
                return <Badge color="primary">Reserved</Badge>;
        }
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
                            <td className="text-center" style={{ width: '90px' }}>{renderBookStatus(history)}</td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
