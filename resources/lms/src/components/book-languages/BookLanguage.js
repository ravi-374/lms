import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({bookLanguages, onOpenModal, sortAction, sortObject}) => {
    const headers = [{id: 'language_code', name: 'Code'},{id: 'language_name', name: 'Name'}];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {bookLanguages.map((bookLanguage) =>
                     (
                        <tr key={bookLanguage.id.toString()}>
                            <td>{bookLanguage.language_code}</td>
                            <td>{bookLanguage.language_name}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} item={bookLanguage}/>
                            </td>
                        </tr>
                    )
            )}
            </tbody>
        </Table>
    );
};
