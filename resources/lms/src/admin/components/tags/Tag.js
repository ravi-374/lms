import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';

export default ({tags, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'name', name: 'Name'}];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {tags.map((tag) =>
                (
                    <tr key={tag.id.toString()}>
                        <td>{tag.name}</td>
                        <td className="text-center">
                            <ModalAction onOpenModal={onOpenModal} item={tag}/>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    );
};
