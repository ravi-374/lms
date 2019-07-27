import React from 'react';
import {connect} from 'react-redux';
import {Table, Button} from 'reactstrap';
import {prepareFullNames} from '../../../shared/sharedMethod';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {bookStatusConstant} from '../../constants';
import {addToast} from '../../../store/action/toastAction';
import {dateFormatter} from '../../../shared/sharedMethod';
import {reserveBook} from '../../store/actions/bookSearchAction';

const Book = ({books, addToast, reserveBook}) => {
    const renderActionButton = (book, index) => {
        switch (book.is_available) {
            case bookStatusConstant.STATUS_AVAILABLE:
                return <Button color="primary" onClick={() => reserveBook(book.id, index)}>Reserve</Button>;
            default:
                return null;
        }
    };
    const isActionVisible = books.filter(status => status.is_available === bookStatusConstant.STATUS_AVAILABLE).length > 0 ? true : false;
    const isExpectDateVisible = books.filter(book => book.expected_available_date !== null).length > 0 ? true : false;
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <tr>
                <th>Cover</th>
                <th>Book code</th>
                <th>Book Name</th>
                <th>Author(s)</th>
                <th>Publisher</th>
                <th>Language</th>
                {isExpectDateVisible ? <th>Expected Available Date</th> : null}
                <th>Status</th>
                {isActionVisible ? <th className="text-center">Action</th> : null}
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => {
                const imageUrl = book.image ? publicImagePathURL.BOOK_AVATAR_URL + book.image : publicImagePath.BOOK_AVATAR;
                return (
                    <tr className="book__table-row" key={book.id.toString()}>
                        <td className="text-center book__table-row-cover">
                            <img src={imageUrl} alt={imageUrl} height="30"/>
                        </td>
                        <td className="align-middle book__table-row-book-code"
                            style={{width: '100px'}}>{book.book_code}</td>
                        <td className="align-middle">
                            {book.book.name}
                        </td>
                        <td className="align-middle">
                            {prepareFullNames(book.book.authors).map((({name}) => name)).join(',  ')}
                        </td>
                        <td className="align-middle">
                            {book.publisher.name}
                        </td>
                        <td className="align-middle book__table-row-language">
                            {book.language.language_name}
                        </td>
                        {isExpectDateVisible ?
                            <td className="align-middle book__table-row-expected-available-date">
                                {book.expected_available_date ? dateFormatter(book.expected_available_date) : null}
                            </td> : null
                        }
                        <td className="align-middle book__table-row-status">
                            {book.is_available ? <span className="text-success"> Available</span> :
                                <span className="text-danger"> Unavailable</span>}
                        </td>
                        {isActionVisible ?
                            <td className="text-center align-middle book__table-row-action">{renderActionButton(book, index)}</td> : null
                        }
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
};
export default (connect)(null, {addToast, reserveBook})(Book);
