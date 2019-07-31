import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {dateFormatter, timeFormatter} from '../../../shared/sharedMethod';
import {Routes} from "../../../constants";
import BookStatus from '../../../shared/book-status/book-status';
import TooltipItem from "../../../shared/tooltip/TolltipItem";

export default ({ books, booksAllotment, members, onOpenModal, sortAction, sortObject, history }) => {
    const headers = [
        { id: 'book_name', name: 'Book' },
        { id: 'book_code', name: 'Book Item' },
        { id: 'member_name', name: 'Member' },
        { id: 'issued_on', name: 'Issue Date' },
        { id: 'return_date', name: 'Return Date' },
        { id: 'status_name', name: 'Status' },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const renderBookStatus = (bookAllotment) => {
        const statusProps = { status: bookAllotment.status, item: bookAllotment };
        return <BookStatus {...statusProps} item={bookAllotment}/>
    };
    const gotToBookHistoryDetail = (bookAllotmentId) => {
        history.push(`${Routes.BOOK_ALLOTMENTS + bookAllotmentId}/details`);
    };

    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {booksAllotment.map((bookAllotment) => {
                    const member = members.find(member => member.id === +bookAllotment.member_id);
                    if (member) {
                        bookAllotment.member_name = member.name;
                    }
                    return (
                        <tr key={bookAllotment.id.toString()} className="books-allotment-table-row"
                            onClick={() => gotToBookHistoryDetail(bookAllotment.id)}>
                            <td>{bookAllotment.book_item.book.name}</td>
                            <td>{bookAllotment.book_item.edition + ` (${bookAllotment.book_item.book_code})`}</td>
                            <td>{bookAllotment.member_name}</td>
                            <td>
                                <span id={'custom-tooltip-' + bookAllotment.id}>
                                      {bookAllotment.issued_on ? dateFormatter(bookAllotment.issued_on) : ''}
                                </span>
                                <TooltipItem key={bookAllotment.id.toString()}
                                             tooltip={bookAllotment.issued_on ? timeFormatter(bookAllotment.issued_on) : ' '}
                                             target={'custom-tooltip-' + bookAllotment.id}/>
                            </td>
                            <td>
                                  <span id={'custom-tooltip-' + bookAllotment.id}>
                                      {bookAllotment.return_date ? dateFormatter(bookAllotment.return_date) : ''}
                                  </span>
                                <TooltipItem key={bookAllotment.id.toString()}
                                             tooltip={bookAllotment.return_date ? timeFormatter(bookAllotment.return_date) : ' '}
                                             target={'custom-tooltip-' + bookAllotment.id}/>
                            </td>
                            <td className="text-center" style={{ width: '90px' }}>{renderBookStatus(bookAllotment)}</td>
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
