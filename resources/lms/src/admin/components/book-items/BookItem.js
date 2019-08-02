import React from 'react';
import {Table, Badge} from 'reactstrap';
import './BookItems.scss';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {sortConfig} from '../../../config/sortConfig';
import {bookStatusConstant} from "../../constants";

export default ({bookItems, bookLanguages, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'book_code', name: 'Book Code'},
        {id: 'edition', name: 'Edition'},
        {id: 'language_name', name: 'Language'},
        {id: 'status_name', name: 'Status'}
    ];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    const renderBookItemStatus = (bookItem) => {
        switch (bookItem.is_available) {
            case bookStatusConstant.STATUS_AVAILABLE:
                bookItem.status_name = 'Available';
                return <Badge color="success">Available</Badge>;
            default:
                bookItem.status_name = 'Unavailable';
                return <Badge color="danger">Unavailable</Badge>;
        }
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
                                <ModalAction onOpenModal={onOpenModal} item={bookItem}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
