import React from 'react';
import {Table, Badge} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';

export default ({members, membershipPlans, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'email', name: 'Email'},
        {id: 'phone', name: 'Phone'},
        {id: 'membership_plan_name', name: 'Membership Plan'},
        {id: 'full_address', name: 'Address'},
        {id: 'status', name: 'Status'},
    ];
    const headerProps = {staticField: 'Image', sortAction, sortObject, sortConfig, headers};
    const renderMemberStatus = (member) => {
        switch (member.is_active) {
            case true:
                member.status = 'Active';
                return <Badge color="primary">Active</Badge>;
            default:
                member.status = 'Inactive';
                return <Badge color="danger">Inactive</Badge>;
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {members.map((member) => {
                    const imageUrl = member.image ? '/members/' + member.image : 'images/user-avatar.png';
                    member.name = member.first_name + ' ' + member.last_name;
                    member.full_address = '';
                    const memberPlan = membershipPlans.find(memberPlan => memberPlan.id === member.membership_plan_id);
                    if (memberPlan) {
                        member.membership_plan_name = memberPlan.name;
                    }
                    if (member.address) {
                        if (member.address.address_1) {
                            member.full_address += member.address.address_1 + ',';
                        }
                        if (member.address.address_2) {
                            member.full_address += member.address.address_2 + ',';
                        }
                        member.full_address += member.address.city;
                        if (member.address.state) {
                            member.full_address += ',' + member.address.state;
                        }
                        if (member.address.country) {
                            member.full_address += ',' + member.address.country;
                        }
                        if (member.address.zip) {
                            member.full_address += '-' + member.address.zip;
                        }
                    }
                    return (
                        <tr key={member.id.toString()}>
                            <td className="text-center align-middle">
                                <img src={imageUrl} alt={imageUrl} width="50" height="50"/>
                            </td>
                            <td className="align-middle">{member.name}</td>
                            <td className="align-middle">{member.email}</td>
                            <td className="align-middle">{member.phone ? member.phone : 'N/A'}</td>
                            <td className="align-middle" style={{width: '186px'}}>{member.membership_plan_name}</td>
                            <td className="align-middle">
                                {member.full_address !== '' ? member.full_address : 'N/A'}
                            </td>
                            <td className="align-middle text-center" style={{width: '85px'}}>
                                {renderMemberStatus(member)}
                            </td>
                            <td className="align-middle text-center">
                                <ModalAction onOpenModal={onOpenModal} item={member}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
