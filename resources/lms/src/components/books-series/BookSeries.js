import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({booksSeries, books, onOpenModal, sortAction, sortObject,history}) => {
    const headers = [
        {id: 'title', name: 'Title'},
    ];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    const goToEditSeriesBook = (bookId) => {
        history.push(`/app/admin/books-series/${bookId}/edit`);
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {booksSeries.map((bookSeries) => {
                    return (
                        <tr key={bookSeries.id.toString()}>
                            <td>{bookSeries.title}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} item={bookSeries} isEditMode={true}
                                             goToEditItem={goToEditSeriesBook}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
