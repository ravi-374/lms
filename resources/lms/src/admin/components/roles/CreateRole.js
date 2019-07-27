import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Modal from '../../shared/components/Modal';
import {addRole} from '../../store/actions/roleAction';
import {fetchPermissions} from '../../store/actions/permissionAction';
import RoleForm from './RoleForm';
import _ from 'lodash';

const CreateRole = (props) => {
    useEffect(() => {
        props.fetchPermissions();
    }, []);
    const onSaveRole = (formValues) => {
        const copyFormValues = _.clone(formValues);
        copyFormValues.permissions = copyFormValues.permissionArray;
        delete copyFormValues.permissionArray;
        props.addRole(copyFormValues);
    };
    const prepareFormOption = {
        onSaveRole,
        onCancel: props.toggleModal,
        permissions: props.permissions
    };
    return <Modal {...props} content={<RoleForm{...prepareFormOption}/>}/>
};

const preparePermissions = permissions => {
    let permissionArray = [];
    permissions.forEach(permission => {
        permissionArray.push({id: permission.id, name: permission.display_name})
    });
    return permissionArray;
};
const mapStateToProps = (state) => {
    const {permissions} = state;
    return {
        permissions: preparePermissions(permissions)
    }
};
export default connect(mapStateToProps, {addRole, fetchPermissions})(CreateRole);
