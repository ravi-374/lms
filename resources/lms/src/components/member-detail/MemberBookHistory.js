import React from 'react';
import {Table, Badge} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import {bookAllotmentStatusConstant} from '../../constants';
import {dateFormatter} from '../../shared/sharedMethod';

export default ({books, memberBookHistory, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'book_name', name: 'Book'},
        {id: 'book_code', name: 'Book Item'},
        {id: 'issued_on', name: 'Issue Date'},
        {id: 'return_due_date', name: 'Return Due Date'},
        {id: 'return_date', name: 'Return Date'},
        {id: 'status_name', name: 'Status'},
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
            default:
                bookHistory.status_name = 'Reserved';
                return <Badge color="primary">Reserved</Badge>;
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {memberBookHistory.map((bookHistory) => {
                    const book = books.find(book => book.id === +bookHistory.book_item.book.id);
                    if (book) {
                        bookHistory.book_name = book.name;
                    }
                    return (
                        <tr key={bookHistory.id.toString()}>
                            <td>{bookHistory.book_name}</td>
                            <td>{bookHistory.book_item.edition + ` (${bookHistory.book_item.book_code})`}</td>
                            <td>{bookHistory.issued_on ? dateFormatter(bookHistory.issued_on) : ' '}</td>
                            <td>{bookHistory.return_due_date ? dateFormatter(bookHistory.return_due_date) : ' '}</td>
                            <td>{bookHistory.return_date ? dateFormatter(bookHistory.return_date) : ' '}</td>
                            <td className="text-center" style={{width: '90px'}}>{renderBookStatus(bookHistory)}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} isHideDeleteIcon={true} item={bookHistory}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};