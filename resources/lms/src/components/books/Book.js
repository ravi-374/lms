import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import {priceFormatter} from '../../shared/sharedMethod';

export default ({books, authors, publishers, tags, bookLanguages, genres, onOpenModal, history, sortAction, sortObject}) => {
    const headers = [
        {id: 'isbn_no', name: 'ISBN No.'},
        {id: 'name', name: 'Book Name'},
        {id: 'author_name', name: 'Author'},
        {id: 'publisher_name', name: 'Publisher'},
        {id: 'language_name', name: 'Language'},
        {id: 'price', name: 'Price'}
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
                const author = authors.find(author => author.id === +book.author_id);
                if (author) {
                    book.author_name = author.first_name + ' ' + author.last_name;
                }
                const publisher = publishers.find(publisher => publisher.id === +book.publisher_id);
                if (publisher) {
                    book.publisher_name = publisher.name;
                }
                const language = bookLanguages.find(language => language.id === +book.language_id);
                if (language) {
                    book.language_name = language.language_name;
                }
                const imageUrl = book.image ? '/images/books/' + book.image : 'images/default-book-image.jpg';
                return (
                    <tr key={book.id.toString()}>
                        <td className="text-center"><img src={imageUrl} alt={imageUrl} width="50" height="50"/></td>
                        <td className="align-middle">{book.isbn}</td>
                        <td className="align-middle">{book.name}</td>
                        <td className="align-middle">{book.author_name}</td>
                        <td className="align-middle">{book.publisher_name}</td>
                        <td className="align-middle">{book.language_name}</td>
                        <td className="align-middle text-right">{priceFormatter(book.price)}</td>
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
