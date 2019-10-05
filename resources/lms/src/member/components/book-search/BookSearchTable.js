import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {bookItemStatusConstants} from "../../constants";
import {dateFormatter, getFormattedMessage, prepareFullNames} from '../../../shared/sharedMethod';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {reserveBook} from '../../store/actions/bookSearchAction';

const BookSearchTable = (props) => {
    const { books, reserveBook } = props;

    const renderActionButton = (book, index) => {
        switch (book.status) {
            case bookItemStatusConstants.AVAILABLE:
                return <Button color="primary" onClick={() => reserveBook(book.id, index)}>Reserve</Button>;
            default:
                return null;
        }
    };

    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <tr>
                <th className="text-center">{getFormattedMessage('image-picker.dropdown.cover.label')}</th>
                <th>{getFormattedMessage('books.table.book-code.column')}</th>
                <th>{getFormattedMessage('books.select.book.label')}</th>
                <th>{getFormattedMessage('books.table.authors.column')}</th>
                <th>{getFormattedMessage('books.table.edition.column')}</th>
                <th>{getFormattedMessage('books.table.language.column')}</th>
                <th>{getFormattedMessage('books.table.available-date.column')}</th>
                <th className="text-center">{getFormattedMessage('react-data-table.status.column')}</th>
                <th className="text-center">{getFormattedMessage('react-data-table.action.column')}</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => {
                const imageUrl = book.book.image ?
                    publicImagePathURL.BOOK_AVATAR_URL + book.book.image : publicImagePath.BOOK_AVATAR;

                return (
                    <tr className="book__table-row" key={book.id.toString()}>
                        <td className="text-center align-middle book__table-row-cover">
                            <img src={imageUrl} alt={imageUrl} height="30"/>
                        </td>
                        <td className="align-middle book__table-row-book-code"
                            style={{ width: '100px' }}>{book.book_code}</td>
                        <td className="align-middle">
                            {book.book.name}
                        </td>
                        <td className="align-middle">
                            {prepareFullNames(book.book.authors).map((({ name }) => name)).join(',  ')}
                        </td>
                        <td className="align-middle">
                            {book.edition ? book.edition : ''}
                        </td>
                        <td className="align-middle book__table-row-language">
                            {book.language.language_name}
                        </td>
                        <td className="align-middle book__table-row-expected-available-date">
                            {book.expected_available_date ? dateFormatter(book.expected_available_date) : null}
                        </td>
                        <td className="align-middle text-center book__table-row-status">
                            {book.status === bookItemStatusConstants.AVAILABLE ?
                                <span className="text-success">
                                    {getFormattedMessage('books.table.book-available.column')}
                                </span> :
                                <span className="text-danger">
                                {getFormattedMessage('books.table.book-un-available.column')}
                                </span>}
                        </td>
                        <td className="text-center align-middle book__table-row-action">{renderActionButton(book, index)}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
};

BookSearchTable.propTypes = {
    books: PropTypes.array,
    reserveBook: PropTypes.func,
};

export default (connect)(null, { reserveBook })(BookSearchTable);