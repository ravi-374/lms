import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';
import {toggleModal} from '../../store/actions/modalAction';

const GlobalModal = (props) => {
    const className = `modal-primary primary ${props.className}`;
    return (
        <Modal isOpen={props.isToggle} toggle={props.toggleModal} centered={props.actions ? true : false}
               className={className}>
            <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
            <ModalBody>{props.content}
            </ModalBody>
            {props.actions ? <ModalFooter>{props.actions}</ModalFooter> : null}
        </Modal>
    );
};

const mapStateToProps = state => {
    return {isToggle: state.isToggle};
};

export default connect(mapStateToProps, {toggleModal})(GlobalModal);