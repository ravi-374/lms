import React from 'react';
import {connect} from 'react-redux';
import Toast from './Toast';
import {removeToast} from '../../store/actions/toastAction';

const Toasts = props => {
    const {removeToast, toasts} = props;
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

const mapStateToProps = state => {
    return {toasts: state.toasts}
};

export default connect(mapStateToProps, {removeToast})(Toasts);
