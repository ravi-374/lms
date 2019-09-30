import React from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';

const GlobalModal = (props) => {
    const { className, isToggle, toggleModal, actions, title, content } = props;
    const modalClassName = `modal-primary primary ${className}`;
    return (
        <Modal isOpen={isToggle}  centered={!!actions} className={modalClassName}>
            <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
            <ModalBody>
                {content}
            </ModalBody>
            {actions ? <ModalFooter>{actions}</ModalFooter> : null}
        </Modal>
    );
};

const mapStateToProps = state => {
    return { isToggle: state.isToggle };
};

GlobalModal.propTypes = {
    title: PropTypes.object,
    actions: PropTypes.element,
    content: PropTypes.element,
    className: PropTypes.string,
    isToggle: PropTypes.bool,
    toggleModal: PropTypes.func
};

export default connect(mapStateToProps)(GlobalModal);
