import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../shared/components/ToggleSwitch';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../store/actions/toastAction';

const Member = ({members, membershipPlans, onOpenModal, sortAction, sortObject, addToast, setActiveInactive}) => {
    const isActive = members.length > 0 ? members.map(({is_active}) => is_active) : [];
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'email', name: 'Email'},
        {id: 'phone', name: 'Phone'},
        {id: 'membership_plan_name', name: 'Membership Plan'},
        {id: 'status', name: 'Status'},
    ];
    const headerProps = {staticField: 'Image', sortAction, sortObject, sortConfig, headers};
    const onChecked = (index, memberId) => {
        setActiveInactive(index);
        apiConfig.get(`members/${memberId}/update-status`).then(response => {
            addToast({text: response.data.message});
        }).catch(({response}) => {
            addToast({text: response.data.message, type: 'error'});
        })
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {members.map((member, index) => {
                    const imageUrl = member.image ? '/members/' + member.image : 'images/user-avatar.png';
                    member.name = member.first_name + ' ' + member.last_name;
                    const memberPlan = membershipPlans.find(memberPlan => memberPlan.id === member.membership_plan_id);
                    if (memberPlan) {
                        member.membership_plan_name = memberPlan.name;
                    }
                    return (
                        <tr key={member.id.toString()}>
                            <td className="text-center" style={{width: '90px'}}>
                                <img src={imageUrl} alt={imageUrl} height="30"/>
                            </td>
                            <td className="align-middle">{member.name}</td>
                            <td className="align-middle">{member.email}</td>
                            <td className="align-middle">{member.phone ? member.phone : ' '}</td>
                            <td className="align-middle" style={{width: '186px'}}>{member.membership_plan_name}</td>
                            <td className="text-center" style={{width: '90px'}}>
                                <div className="member-form__switch">
                                    <Field name="is_active" checked={isActive[index]} component={ToggleSwitch}
                                           onChange={() => onChecked(index, member.id)}/>
                                </div>
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

const memberForm = reduxForm({form: 'memberForm'})(Member);
export default connect(null, {addToast})(memberForm);
