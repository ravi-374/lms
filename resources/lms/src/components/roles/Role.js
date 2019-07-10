import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({roles, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'name', name: 'Name'}, {id: 'display_name', name: 'Display Name'}];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {roles.map((role) =>
                (
                    <tr key={role.id.toString()}>
                        <td>{role.name}</td>
                        <td>{role.display_name}</td>
                        <td className="text-center">
                            <ModalAction onOpenModal={onOpenModal} item={role}/>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
};
