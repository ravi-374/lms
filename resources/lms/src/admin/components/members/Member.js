import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {sortConfig} from '../../../config/sortConfig';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import './Members.scss';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";


const Member = ({members, membershipPlans, onOpenModal, sortAction, sortObject, addToast, setActiveInactive, history}) => {
    const isActive = members.length > 0 ? members.map(({is_active}) => is_active) : [];
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'email', name: 'Email'},
        {id: 'phone', name: 'Phone'},
        {id: 'membership_plan_name', name: 'Membership Plan'},
        {id: 'status', name: 'Status'},
    ];
    const headerProps = {staticField: 'Profile', sortAction, sortObject, sortConfig, headers};
    const onChecked = (index, memberId) => {
        setActiveInactive(index);
        apiConfig.get(`members/${memberId}/update-status`).then(response => {
            addToast({text: response.data.message});
        }).catch(({response}) => {
            addToast({text: response.data.message, type: 'error'});
        })
    };
    const goToMemberDetailPage = (memberId) => {
        history.push(`members/${memberId}/details`);
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {members.map((member, index) => {
                    const imageUrl = member.image ? publicImagePathURL.MEMBER_AVATAR_URL + member.image : publicImagePath.USER_AVATAR;
                    member.name = member.first_name + ' ' + member.last_name;
                    const memberPlan = membershipPlans.find(memberPlan => memberPlan.id === member.membership_plan_id);
                    if (memberPlan) {
                        member.membership_plan_name = memberPlan.name;
                    }
                    return (
                        <tr className="member-table-row" onClick={() => goToMemberDetailPage(member.id)}
                            key={member.id.toString()}>
                            <td className="text-center member-table-row__profile">
                                <img className="member-table-row__profile-img" src={imageUrl} alt={imageUrl}/>
                            </td>
                            <td className="align-middle">{member.name}</td>
                            <td className="align-middle">{member.email}</td>
                            <td className="align-middle">{member.phone ? member.phone : ' '}</td>
                            <td className="align-middle member-table-row__plan-name">{member.membership_plan_name}</td>
                            <td className="text-center member-table-row__switch">
                                <div className="member-form__switch" onClick={(e) => e.stopPropagation()}>
                                    <Field name="is_active" checked={isActive[index]} component={ToggleSwitch}
                                           onChange={() => onChecked(index, member.id)}/>
                                </div>
                            </td>
                            <td className="align-middle text-center text-nowrap">
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
