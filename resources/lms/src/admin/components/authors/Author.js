import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';

export default ({authors, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'name', name: 'Name'}];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {authors.map((author) => {
                    author.name = author.first_name;
                    if (author.last_name) {
                        author.name += ' ' + author.last_name;
                    }
                    return (
                        <tr key={author.id.toString()}>
                            <td>{author.name}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} item={author}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
