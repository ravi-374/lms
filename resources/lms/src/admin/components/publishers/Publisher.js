import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';

export default ({publishers, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'name', name: 'Name'}];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {publishers.map((publisher) =>
                (
                    <tr key={publisher.id.toString()}>
                        <td>{publisher.name}</td>
                        <td className="text-center">
                            <ModalAction onOpenModal={onOpenModal} item={publisher}/>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
};
