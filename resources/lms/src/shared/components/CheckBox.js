import React from 'react';
import PropTypes from 'prop-types';
import './Component.scss';

const CheckBox = (props) => {
    const { input, label, checked = false } = props;

    return (
        <label className="control control--checkbox">{label}
            <input type="checkbox" checked={checked} {...input}/>
            <div className="control__indicator"/>
        </label>
    );
};

CheckBox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    checked: PropTypes.bool,
};

export default CheckBox;
