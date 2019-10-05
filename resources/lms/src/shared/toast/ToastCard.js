import React from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';
import {toastType} from "../../admin/constants";
import {getFormattedMessage} from "../sharedMethod";

const ToastCard = (props) => {
    const { type, text, closeToast } = props;

    const renderCard = () => {
        switch (type) {
            case toastType.ERROR:
                return (
                    <div className="toast-card__alert">
                        <div className="toast-card__icon toast-card--error">
                            <i className="fas fa-times-circle"/>
                        </div>
                        <div>
                            <h5>{getFormattedMessage('toast.error.message')}</h5>
                            <span>{text}</span>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="toast-card__alert">
                        <div className="toast-card__icon toast-card--success">
                            <i className="fas fa-check-circle"/>
                        </div>
                        <div>
                            <h5>{getFormattedMessage('toast.success.message')}</h5>
                            <span>{text}</span>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="toast-card">
            <i className="fa fa-times-circle fa-2x toast-card__close-btn" onClick={closeToast}/>
            {renderCard()}
        </div>
    )
};

ToastCard.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    type: PropTypes.string,
    closeToast: PropTypes.func,
};

export default ToastCard;
