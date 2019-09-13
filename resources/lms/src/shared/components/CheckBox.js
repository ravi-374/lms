import React from 'react';
import './Component.scss';

export default ({input, label, checked = false}) => {
    return (
        <label className="control control--checkbox">{label}
            <input type="checkbox" checked={checked} {...input}/>
            <div className="control__indicator"/>
        </label>
    );
};
