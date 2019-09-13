import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import './Members.scss';
import {publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {storageKey} from "../../constants";
import {getAvatarName} from "../../../shared/sharedMethod";

const MemberTable = (props) => {
    const { members, membershipPlans, onOpenModal, setActiveInactive, history, isLoading, totalRecord, onChangeData } = props;
    const columns = [
        {
            name: 'Profile',
            selector: 'image',
            width: '95px',
            cell: row => {
                const imageUrl = row.image ? publicImagePathURL.MEMBER_AVATAR_URL + row.image : null;
                if (imageUrl)
                    return <img src={imageUrl ? imageUrl : null} className="member-table-row__profile-img"
                                alt={imageUrl}/>;
                return <div className="user__avatar">
                    <span>{getAvatarName(row.first_name + ' ' + row.last_name)}</span>
                </div>;
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
            selector: 'membership_plan_name',
            sortable: true,
            cell: row => {
                row.membership_plan_name = row.membership_plan.name;
                return <span>{row.membership_plan_name}</span>
            }
        },
        {
            name: 'Status',
            selector: 'status',
            width: '90px',
            center: true,
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
    const getStoredFilterKey = () => {
        const item = JSON.parse(localStorage.getItem(storageKey.MEMBERS));
        if (item) {
            const membershipPlan = membershipPlans.find(membershipPlan => membershipPlan.id === item.id);
            if (membershipPlan) {
                return membershipPlan;
            }
        }
        return membershipPlans[0];
    };
    return (
        <ReactDataTable items={members} columns={columns} isShowFilterField filterOptions={membershipPlans}
                        filterKey={getStoredFilterKey()} loading={isLoading} totalRows={totalRecord}
                        onChange={onChangeData} filterKeyName={storageKey.MEMBERS}/>
    );
};

const memberForm = reduxForm({ form: 'memberForm' })(MemberTable);
export default connect(null)(memberForm);
