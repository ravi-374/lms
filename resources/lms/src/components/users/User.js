import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Table} from 'reactstrap';
import {sortConfig} from '../../config/sortConfig';
import TableHeader from '../../shared/table-header/Tableheader';
import ModalAction from '../../shared/action-buttons/ModalAction';
import ToggleSwitch from '../../shared/components/ToggleSwitch';
import './Users.scss';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../store/actions/toastAction';

const User = ({users, roles, onOpenModal, sortAction, sortObject, addToast, setActiveInactive, history}) => {
    const isActive = users.length > 0 ? users.map(({is_active}) => is_active) : [];
    const headers = [
        {id: 'name', name: 'Name'},
        {id: 'email', name: 'Email'},
        {id: 'phone', name: 'Phone'},
        {id: 'role_name', name: 'Role'},
        {id: 'status', name: 'Status'},
    ];
    const headerProps = {staticField: 'Image', sortAction, sortObject, sortConfig, headers};
    const onChecked = (index, userId) => {
        setActiveInactive(index);
        apiConfig.get(`users/${userId}/update-status`).then(response => {
            addToast({text: response.data.message});
        }).catch(({response}) => {
            addToast({text: response.data.message, type: 'error'});
        })
    };
    const goToUserDetail = (userId) => {
        history.push(`/app/users/${userId}/detail`);
    };
    return (
        <Table hover bordered striped responsive size="md">
            <thead>
            <TableHeader{...headerProps}/>
            </thead>
            <tbody>
            {users.map((user, index) => {
                    const imageUrl = user.image ? 'uploads/users/' + user.image : 'images/user-avatar.png';
                    if (user.roles.length > 0) {
                        const role = roles.find(role => role.id === +user.roles[0].id);
                        if (role) {
                            user.role_name = role.name;
                        }
                    }
                    user.name = user.first_name + ' ' + user.last_name;
                    return (
                        <tr key={user.id.toString()} className="user-table-row" onClick={() => goToUserDetail(user.id)}>
                            <td className="text-center" style={{width: '90px'}}>
                                <img src={imageUrl} alt={imageUrl} height="30"/>
                            </td>
                            <td className="align-middle">{user.name}</td>
                            <td className="align-middle">{user.email}</td>
                            <td className="align-middle">{user.phone ? user.phone : ' '}</td>
                            <td className="align-middle">{user.role_name ? user.role_name : ' '}</td>
                            <td className="text-center" style={{width: '90px'}}>
                                <div className="user-form__switch">
                                    <Field name="is_active" checked={isActive[index]} component={ToggleSwitch}
                                           onChange={() => onChecked(index, user.id)}/>
                                </div>
                            </td>

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

const userForm = reduxForm({form: 'userForm'})(User);
export default connect(null, {addToast})(userForm);
