import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {onChangePassword} from '../../store/actions/changePasswordAction';
import ChangePasswordForm from "./ChangePasswordForm";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const ChangePassword = (props) => {
    const { onChangePassword, toggle, isOpen } = props;

    const onSaveChangePassword = (formValues) => {
        onChangePassword(formValues);
    };

    const prepareFormOption = {
        onSaveChangePassword,
        onCancel: toggle,
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} className={'modal-primary primary modal-config--small'}>
            <ModalHeader toggle={toggle}>{getFormattedMessage('change-password.model.header-title')}</ModalHeader>
            <ModalBody>
                <ChangePasswordForm{...prepareFormOption}/>
            </ModalBody>
        </Modal>
    );
};

ChangePassword.propTypes = {
    onChangePassword: PropTypes.func,
    toggle: PropTypes.func
};

export default connect(null, { onChangePassword })(ChangePassword);
