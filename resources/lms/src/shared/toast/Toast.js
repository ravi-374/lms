import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';

const Toast = (props) => {
    const { onCancel } = props;

    useEffect(() => {
        setTimeout(() => onCancel(), 3500);
    }, []);

    return (
        <div className="toast show"
             style={props.type !== 'error' ? { backgroundColor: '#d4edda' } : { backgroundColor: '#f8d7da' }}>
            <div className="toast__icon">{props.type !== 'error' ?
                <i className="fa fa-lg fa-check" style={{ backgroundColor: 'white' }}/> :
                <i style={{ backgroundColor: 'white', color: 'red' }} className="fa fa-lg fa-exclamation-circle"/>}
            </div>
            {props.type !== 'error' ?
                <div className="toast__message">{props.text}</div>
                : <div className="toast__message" style={{ color: 'red' }}>{props.text}</div>
            }
        </div>
    );
};

Toast.propTypes = {
    onCancel: PropTypes.func,
};

export default Toast;
