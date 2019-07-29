import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {prepareAuthor} from './prepareArray';
import './Books.scss';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';

export default ({books, onOpenModal, history, sortAction, sortObject}) => {
    const headers = [
        {id: 'isbn', name: 'ISBN No.'},
        {id: 'name', name: 'Book Name'},
        {id: 'authors_name', name: 'Authors'},
    ];
    const headerProps = {staticField: 'Cover', sortAction, sortObject, sortConfig, headers};
    const goToEditBook = (bookId) => {
        history.push(`/app/admin/books/${bookId}/edit`);
    };
    const goToBookDetail = (bookId) => {
        history.push(`/app/admin/books/${bookId}/detail`);
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {books.map((book) => {
                const imageUrl = book.image ? publicImagePathURL.BOOK_AVATAR_URL + book.image : publicImagePath.BOOK_AVATAR;
                book.authors_name = prepareAuthor(book.authors).map((({name}) => name)).join(',  ');
                return (
                    <tr className="book-table-row" key={book.id.toString()} onClick={() => goToBookDetail(book.id)}>
                        <td className="text-center book-table-row__cover">
                            <img className="book-table-row__cover-img" src={imageUrl} alt={imageUrl}/>
                        </td>
                        <td className="align-middle">{book.isbn}</td>
                        <td className="align-middle">{book.name}</td>
                        <td className="align-middle">{book.authors_name}</td>
                        <td className="align-middle text-center">
                            <ModalAction onOpenModal={onOpenModal} item={book} isEditMode={true}
                                         goToEditItem={goToEditBook}/>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
};
