import React from 'react';
import {Table} from 'reactstrap';
import './BookItems.scss';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {sortConfig} from '../../../config/sortConfig';
import BookStatus from "../../../shared/book-status/book-status";

export default ({ bookItems, bookLanguages, onOpenModal, sortAction, sortObject }) => {
    const headers = [
        { id: 'book_code', name: 'Book Code' },
        { id: 'edition', name: 'Edition' },
        { id: 'language_name', name: 'Language' },
        { id: 'status_name', name: 'Status' }
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const renderBookItemStatus = (bookItem) => {
        const statusProps = { status: bookItem.book_item_status, item: bookItem };
        return <BookStatus {...statusProps} item={bookItem}/>;
    };
    return (
        <Table hover bordered striped responsive size="md" className="book-item__table">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {bookItems.map((bookItem) => {
                    const language = bookLanguages.find(language => language.id === bookItem.language_id);
                    if (language) {
                        bookItem.language_name = language.name;
                    }
                    return (
                        <tr key={bookItem.id.toString()}>
                            <td className="book-item__table-book-code">{bookItem.book_code}</td>
                            <td>{bookItem.edition}</td>
                            <td>{bookItem.language_name}</td>
                            <td className="book-item__table-status">{renderBookItemStatus(bookItem)}</td>
                            <td className="text-center book-item__table-action">
                                <ModalAction isHideDeleteIcon={true} onOpenModal={onOpenModal} item={bookItem}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
