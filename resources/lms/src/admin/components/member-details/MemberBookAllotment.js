import React from 'react';
import {Table} from 'reactstrap';
import './MemberDetails.scss';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import BookStatus from "../../../shared/book-status/book-status";
import {Routes} from "../../../constants";

export default ({ memberBookHistory, onOpenModal, sortAction, sortObject, history }) => {
    const headers = [
        { id: 'book_name', name: 'Book' },
        { id: 'book_code', name: 'Book Item' },
        { id: 'status_name', name: 'Status' },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory}/>
    };
    const gotToBookHistoryDetail = (bookAllotmentId) => {
        history.push(`${Routes.BOOK_ALLOTMENTS + bookAllotmentId}/details`);
    };

    if (!memberBookHistory && memberBookHistory.length === 0) {
        return null;
    }
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {memberBookHistory.map((bookHistory) => {
                    bookHistory.book_name = bookHistory.book_item.book.name;
                    return (
                        <tr key={bookHistory.id.toString()}>
                            <td>{bookHistory.book_name}</td>
                            <td>{bookHistory.book_item.edition + ` (${bookHistory.book_item.book_code})`}</td>
                            <td className="text-center member-detail-table__row-status">{renderBookStatus(bookHistory)}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} isHideDeleteIcon={true} isHideDetailIcon={false}
                                             goToDetailScreen={gotToBookHistoryDetail} item={bookHistory}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
