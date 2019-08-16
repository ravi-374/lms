import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import './Members.scss';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import ReactDataTable from "../../../shared/table/ReactDataTable";

const Member = ({ members, membershipPlans, onOpenModal, addToast, setActiveInactive, history, isLoading, totalRecord, onChangeData }) => {
    const columns = [
        {
            name: 'Profile',
            selector: 'image',
            width: '95px',
            cell: row => {
                const imageUrl = row.image ? publicImagePathURL.MEMBER_AVATAR_URL + row.image : publicImagePath.USER_AVATAR;
                return <img className="member-table-row__profile-img" src={imageUrl} alt={imageUrl}/>
            },
        },
        {
            name: 'Name',
            selector: 'first_name',
            sortable: true,
            cell: row => <span>{row.first_name + ' ' + row.last_name}</span>
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Phone',
            selector: 'phone',
            sortable: true,
        },
        {
            name: 'Membership Plan',
            accessor: (d) => d.membership_plan_name,
            sortable: true,
            cell: row => {
                const memberPlan = membershipPlans.find(memberPlan => memberPlan.id === row.membership_plan_id);
                if (memberPlan) {
                    row.membership_plan_name = memberPlan.name;
                    return <span>{row.membership_plan_name}</span>
                }
               return '';
            },
        },
        {
            name: 'Status',
            selector: 'status',
            width: '90px',
            cell: (row) =>
                <div className="member-form__switch">
                    <Field name="is_active" checked={row.is_active} component={ToggleSwitch}
                           onChange={() => onChecked(row)}/>
                </div>
        },
        {
            name: 'Action',
            selector: 'id',
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
            cell: row => <ModalAction onOpenModal={onOpenModal} isHideDetailIcon={false}
                                      goToDetailScreen={goToMemberDetailPage} item={row}/>,
        }];

    const onChecked = (member) => {
        setActiveInactive(member.id);
    };
    const goToMemberDetailPage = (memberId) => {
        history.push(`${Routes.MEMBERS + memberId}/details`);
    };
    return (
        <ReactDataTable items={members} columns={columns} loading={isLoading} totalRows={totalRecord}
                        onChange={onChangeData}/>
    );
};

const memberForm = reduxForm({ form: 'memberForm' })(Member);
export default connect(null)(memberForm);
