import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Toast from './Toast';
import {removeToast} from '../../store/action/toastAction';

const Toasts = props => {
    const { removeToast, toasts } = props;

    return (
        <div>
            {toasts.map(toast => {
                return (
                    <Toast {...toast} key={toast.id} onCancel={() => removeToast(toast.id)}/>
                );
            })}
        </div>
    );
};

Toasts.propTypes = {
    toasts: PropTypes.array,
    removeToast: PropTypes.func,
};

const mapStateToProps = state => {
    return { toasts: state.toasts }
};

export default connect(mapStateToProps, { removeToast })(Toasts);
