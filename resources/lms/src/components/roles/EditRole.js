import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {editRole} from '../../store/actions/roleAction';
import {fetchPermissions} from '../../store/actions/permissionAction';
import RoleForm from './RoleForm';
import _ from 'lodash';

const EditRole = (props) => {
    useEffect(() => {
        props.fetchPermissions();
    }, []);
    const onSaveRole = (formValues) => {
        const copyFormValues = _.clone(formValues);
        copyFormValues.permissions = copyFormValues.permissionArray;
        delete copyFormValues.permissionArray;
        props.editRole(props.role.id, copyFormValues);
    };
    const prepareFormOption = {
        onSaveRole,
        onCancel: props.toggleModal,
        permissions: props.permissions,
        initialValues: {
            name: props.role.name,
            display_name: props.role.display_name,
            description: props.role.description
        }
    };
    return <Modal {...props} content={<RoleForm {...prepareFormOption}/>}/>
};

const preparePermissions = (permissions, selectedPermission) => {
    let permissionArray = [];
    permissions.forEach(permission => {
        const perm = selectedPermission.find(perm => perm.id === permission.id);
        let selected = false;
        if (perm) {
            selected = true;
        }
        permissionArray.push({id: permission.id, name: permission.display_name, selected})
    });
    return permissionArray;
};
const mapStateToProps = (state, ownProps) => {
    const {permissions} = state;
    return {
        permissions: preparePermissions(permissions, ownProps.role.perms)
    }
};
export default connect(mapStateToProps, {editRole, fetchPermissions})(EditRole);
