import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import {prepareAuthor} from './prepareArray';

export default ({books, onOpenModal, history, sortAction, sortObject}) => {
    const headers = [
        {id: 'isbn', name: 'ISBN No.'},
        {id: 'name', name: 'Book Name'},
        {id: 'authors_name', name: 'Authors'},
    ];
    const headerProps = {staticField: 'Image', sortAction, sortObject, sortConfig, headers};
    const goToEditBook = (bookId) => {
        history.push(`/app/books/${bookId}/edit`);
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {books.map((book) => {
                const imageUrl = book.image ? 'uploads/books/' + book.image : 'images/default-book-image.jpg';
                book.authors_name = prepareAuthor(book.authors).map((({name}) => name)).join(', ');
                return (
                    <tr key={book.id.toString()}>
                        <td className="text-center" style={{width: '90px'}}>
                            <img src={imageUrl} alt={imageUrl} height="30"/>
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
