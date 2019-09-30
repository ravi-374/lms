import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookItems.scss';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import BookItemStatus from "../../../shared/book-item-status/BookItemStatus";
import {getFormattedMessage, priceFormatter} from "../../../shared/sharedMethod";

export const BookItemTable = (props) => {
    const { bookItems, onClickModal, sortAction, sortObject, currency } = props;
    const headers = [
        { id: 'book_code', name: getFormattedMessage('books.items.input.book-code.label') },
        { id: 'edition', name: getFormattedMessage('books.items.input.edition.label') },
        { id: 'language_name', name: getFormattedMessage('books.items.select.language.label') },
        { id: 'price', name: getFormattedMessage('books.items.input.price.label') },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers, isStatusField: true };
    const renderBookItemStatus = (bookItem) => {
        const statusProps = { status: bookItem.status, item: bookItem };
        return <BookItemStatus {...statusProps} item={bookItem}/>;
    };
    return (
        <Table hover bordered striped responsive size="md" className="book-item__table">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {bookItems.map((bookItem) => {
                    if (bookItem.language) {
                        bookItem.language_name = bookItem.language.language_name;
                    }
                    return (
                        <tr key={bookItem.id.toString()}>
                            <td className="book-item__table-book-code">{bookItem.book_code}</td>
                            <td>{bookItem.edition}</td>
                            <td>{bookItem.language_name}</td>
                            <td className="book-item__table-price">{priceFormatter(bookItem.price, currency)}</td>
                            <td className="book-item__table-status">{renderBookItemStatus(bookItem)}</td>
                            <td className="text-center book-item__table-action">
                                <ModalAction isHideDeleteIcon={true} onOpenModal={onClickModal} item={bookItem}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};

BookItemTable.propTypes = {
    sortObject: PropTypes.object,
    bookItems: PropTypes.array,
    currency: PropTypes.string,
    sortAction: PropTypes.func,
    onClickModal: PropTypes.func,
};

export default (BookItemTable);
