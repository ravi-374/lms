import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import './Users.scss';
import {addToast} from '../../../store/action/toastAction';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {Routes} from "../../../constants";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {getCurrentUser} from "../../shared/sharedMethod";

const UserTable = (props) => {
    const { users, onOpenModal, setActiveInactive, history, isLoading, totalRecord, onChangeData } = props;
    const columns = [
        {
            name: 'Profile',
            selector: 'image',
            width: '90px',
            cell: row => {
                const imageUrl = row.image ? publicImagePathURL.USER_AVATAR_URL + row.image : publicImagePath.USER_AVATAR;
                return <img className="user-table-row__profile-img" src={imageUrl} alt={imageUrl}/>
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
            name: 'Role',
            selector: 'role_name',
            sortable: true,
            cell: row => {
                if (row.roles) {
                    row.role_name = row.roles[0].display_name;
                }
                return <span>{row.role_name}</span>
            },
        },
        {
            name: 'Status',
            selector: 'status',
            width: '90px',
            center: true,
            cell: (row) =>
                getCurrentUser().id !== row.id ?
                    <div className="user-form__switch">
                        <Field name="is_active" checked={row.is_active} component={ToggleSwitch}
                               onChange={() => onChecked(row)}/>
                    </div> : null
        },
        {
            name: 'Action',
            selector: 'id',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,
            width: '150px',
            cell: row => <ModalAction onOpenModal={onOpenModal} isHideDetailIcon={false}
                                      goToDetailScreen={goToUserDetail} item={row}/>
        }];

    const onChecked = (user) => {
        setActiveInactive(user.id);
    };

    const goToUserDetail = (userId) => {
        history.push(`${Routes.USERS + userId}/details`);
    };
    return (
        <ReactDataTable items={users} columns={columns} loading={isLoading} totalRows={totalRecord}
                        onChange={onChangeData}/>
    );
};

const userForm = reduxForm({ form: 'userForm' })(UserTable);
export default connect(null, { addToast })(userForm);
