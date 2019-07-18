import React from 'react';
import {Table, Badge} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import {circularStatusConstant} from '../../constants';
import {dateFormatter} from '../../shared/sharedMethod';

export default ({books, circulations, members, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'book_name', name: 'Book'},
        {id: 'book_item_id', name: 'Book Item'},
        {id: 'member_name', name: 'Member'},
        {id: 'issuer_name', name: 'Issuer'},
        {id: 'returner_name', name: 'Returner'},
        {id: 'issued_on', name: 'Issue Date'},
        {id: 'return_due_date', name: 'Return Due Date'},
        {id: 'return_date', name: 'Return Date'},
        {id: 'status_name', name: 'Status'},
    ];
    const headerProps = {isAction: false, sortAction, sortObject, sortConfig, headers};
    const renderBookStatus = (circulation) => {
        switch (circulation.status) {
            case circularStatusConstant.BOOK_ISSUED:
                circulation.status_name = 'Issued';
                return <Badge color="success">Issued</Badge>;
            case circularStatusConstant.BOOK_RETURNED:
                circulation.status_name = 'Returned';
                return <Badge color="secondary">Returned</Badge>;
            default:
                circulation.status_name = 'Reserved';
                return <Badge color="primary">Reserved</Badge>;
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {circulations.map((circulation) => {
                    const book = books.find(book => book.id === +circulation.book_item.book.id);
                    if (book) {
                        circulation.book_name = book.name;
                    }
                    const member = members.find(member => member.id === +circulation.member_id);
                    if (member) {
                        circulation.member_name = member.name;
                    }
                    return (
                        <tr key={circulation.id.toString()}>
                            <td>{circulation.book_name}</td>
                            <td>{circulation.book_item.edition + ` (${circulation.book_item.book_item_id})`}</td>
                            <td>{circulation.member_name}</td>
                            <td>{circulation.issuer_name ? circulation.issuer_name : ''}</td>
                            <td>{circulation.returner_name ? circulation.returner_name : ''}</td>
                            <td>{circulation.issued_on ? dateFormatter(circulation.issued_on) : ' '}</td>
                            <td>{circulation.return_due_date ? dateFormatter(circulation.return_due_date) : ' '}</td>
                            <td>{circulation.return_date ? dateFormatter(circulation.return_date) : ' '}</td>
                            <td className="text-center" style={{width: '90px'}}>{renderBookStatus(circulation)}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} item={circulation}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
