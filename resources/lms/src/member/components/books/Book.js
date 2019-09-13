import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'reactstrap';
import {dateFormatter, prepareFullNames} from '../../../shared/sharedMethod';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {addToast} from '../../../store/action/toastAction';
import {reserveBook} from '../../store/actions/bookSearchAction';
import {bookItemStatusConstants} from "../../constants";

const Book = ({ books, addToast, reserveBook }) => {
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
                <th>Cover</th>
                <th>Book Code</th>
                <th>Book Name</th>
                <th>Author(s)</th>
                <th>Edition</th>
                <th>Language</th>
                <th>Expected Available Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => {
                const imageUrl = book.book.image ? publicImagePathURL.BOOK_AVATAR_URL + book.book.image : publicImagePath.BOOK_AVATAR;
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
                        <td className="align-middle book__table-row-status">
                            {book.status === bookItemStatusConstants.AVAILABLE ?
                                <span className="text-success"> Available</span> :
                                <span className="text-danger"> Unavailable</span>}
                        </td>
                        <td className="text-center align-middle book__table-row-action">{renderActionButton(book, index)}</td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
};
export default (connect)(null, { addToast, reserveBook })(Book);
