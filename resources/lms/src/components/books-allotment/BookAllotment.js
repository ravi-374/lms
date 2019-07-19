import React from 'react';
import {Table, Badge} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import {bookAllotmentStatusConstant} from '../../constants';
import {dateFormatter} from '../../shared/sharedMethod';

export default ({books, booksAllotment, members, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'book_name', name: 'Book'},
        {id: 'book_item_id', name: 'Book Item'},
        {id: 'member_name', name: 'Member'},
        {id: 'issuer_name', name: 'Issuer'},
        {id: 'returner_name', name: 'Returner'},
        {id: 'issued_on', name: 'Issue Date'},
        {id: 'return_due_date', name: 'Return Due Date'},
        {id: 'return_date', name: 'Return Date'},
        {id: 'status_name', name: 'Status'},
    ];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    const renderBookStatus = (bookAllotment) => {
        switch (bookAllotment.status) {
            case bookAllotmentStatusConstant.BOOK_ISSUED:
                bookAllotment.status_name = 'Issued';
                return <Badge color="success">Issued</Badge>;
            case bookAllotmentStatusConstant.BOOK_RETURNED:
                bookAllotment.status_name = 'Returned';
                return <Badge color="secondary">Returned</Badge>;
            default:
                bookAllotment.status_name = 'Reserved';
                return <Badge color="primary">Reserved</Badge>;
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {booksAllotment.map((bookAllotment) => {
                    const book = books.find(book => book.id === +bookAllotment.book_item.book.id);
                    if (book) {
                        bookAllotment.book_name = book.name;
                    }
                    const member = members.find(member => member.id === +bookAllotment.member_id);
                    if (member) {
                        bookAllotment.member_name = member.name;
                    }
                    return (
                        <tr key={bookAllotment.id.toString()}>
                            <td>{bookAllotment.book_name}</td>
                            <td>{bookAllotment.book_item.edition + ` (${bookAllotment.book_item.book_item_id})`}</td>
                            <td>{bookAllotment.member_name}</td>
                            <td>{bookAllotment.issuer_name ? bookAllotment.issuer_name : ''}</td>
                            <td>{bookAllotment.returner_name ? bookAllotment.returner_name : ''}</td>
                            <td>{bookAllotment.issued_on ? dateFormatter(bookAllotment.issued_on) : ' '}</td>
                            <td>{bookAllotment.return_due_date ? dateFormatter(bookAllotment.return_due_date) : ' '}</td>
                            <td>{bookAllotment.return_date ? dateFormatter(bookAllotment.return_date) : ' '}</td>
                            <td className="text-center" style={{width: '90px'}}>{renderBookStatus(bookAllotment)}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} isHideDeleteIcon={true} item={bookAllotment}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
