import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({booksSeries, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'title', name: 'Title'}];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {booksSeries.map((bookSeries) =>
                (
                    <tr key={bookSeries.id.toString()}>
                        <td>{bookSeries.title}</td>
                        <td className="text-center">
                            <ModalAction onOpenModal={onOpenModal} item={bookSeries}/>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
};
