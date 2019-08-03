import React from 'react';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import PriceFormatter from '../../../shared/PriceFormatter';
import {membershipPlanFrequency} from '../../constants';

export default ({membershipPlans, onOpenModal, sortAction, sortObject}) => {
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'frequency_name', name: 'Frequency'},
        {id: 'price', name: 'Price'}
    ];
    const headerProps = {sortAction, sortObject, sortConfig, headers};
    const renderMemberShipPlanFrequency = (membershipPlan) => {
        switch (membershipPlan.frequency) {
            case membershipPlanFrequency.MONTHLY:
                membershipPlan.frequency_name = 'Monthly';
                return 'Monthly';
            default :
                membershipPlan.frequency_name = 'Yearly';
                return 'Yearly';
        }
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {membershipPlans.map((membershipPlan) => {
                    return (
                        <tr key={membershipPlan.id.toString()}>
                            <td>{membershipPlan.name}</td>
                            <td>{renderMemberShipPlanFrequency(membershipPlan)}</td>
                            <td className="text-right">{<PriceFormatter price={membershipPlan.price}/>}</td>
                            <td className="text-center">
                                <ModalAction onOpenModal={onOpenModal} item={membershipPlan}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>
    );
};
