import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';

const Genre = ({genres, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'name', name: 'Name'}];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {genres.map((genre) =>
                (
                    <tr key={genre.id.toString()}>
                        <td>{genre.name}</td>
                        <td className="text-center">
                            <ModalAction onOpenModal={onOpenModal} item={genre}/>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
};

export default Genre;

