import React, {useEffect} from 'react';
import './Toast.scss';

const Toast = (props) => {
    useEffect(() => {
        setTimeout(() => props.onCancel(), 5000);
    }, []);
    return (
        <div className="toast show"
             style={props.type !== 'error' ? {backgroundColor: '#d4edda'} : {backgroundColor: '#f8d7da'}}>
            <div className="toast__icon">{props.type !== 'error' ?
                <i className="fa fa-lg fa-check" style={{backgroundColor: 'white'}}/> :
                <i style={{backgroundColor: 'white', color: 'red'}} className="fa fa-lg fa-exclamation-circle"/>}
            </div>
            {props.type !== 'error' ?
                <div className="toast__message">{props.text}</div>
                : <div className="toast__message" style={{color: 'red'}}>{props.text}</div>
            }
        </div>
    );
};

export default Toast;
