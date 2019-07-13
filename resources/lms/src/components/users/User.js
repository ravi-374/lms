import React from 'react';
import {Table, Badge} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({users, roles, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'email', name: 'Email'},
        {id: 'phone', name: 'Phone'},
        {id: 'role_name', name: 'Role'},
        {id: 'status', name: 'Status'},
    ];
    const headerProps = {staticField: 'Image', sortAction, sortObject, sortConfig, headers};
    const renderUserStatus = (user) => {
        switch (user.is_active) {
            case 1:
                user.status = 'Active';
                return <Badge color="primary">Active</Badge>;
            default:
                user.status = 'Inactive';
                return <Badge color="danger">Inactive</Badge>;
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {users.map((user) => {
                    const imageUrl = user.image ? '/users/' + user.image : 'images/user-avatar.png';
                    if (user.roles.length > 0) {
                        const role = roles.find(role => role.id === +user.roles[0].id);
                        if (role) {
                            user.role_name = role.name;
                        }
                    }
                    user.name = user.first_name + ' ' + user.last_name;
                    return (
                        <tr key={user.id.toString()}>
                            <td className="text-center" style={{width: '90px'}}>
                                <img src={imageUrl} alt={imageUrl} height="30"/>
                            </td>
                            <td className="align-middle">{user.name}</td>
                            <td className="align-middle">{user.email}</td>
                            <td className="align-middle">{user.phone ? user.phone : ' '}</td>
                            <td className="align-middle">{user.role_name ? user.role_name : ' '}</td>
                            <td className="align-middle text-center" style={{width: '90px'}}>{renderUserStatus(user)}</td>
                            <td className="align-middle text-center">
                                <ModalAction onOpenModal={onOpenModal} item={user}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
