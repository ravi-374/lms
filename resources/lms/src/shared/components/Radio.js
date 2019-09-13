import React, {Fragment} from 'react';
import './Component.scss';

export default ({input, label, name, checked = false, value = '', disabled = false}) => {
    return (
        <Fragment>
            <input type="radio" name="radio" className="form__radio" checked={checked} {...input} value={value} disabled={disabled}/>
            <label className="form__label">{label}</label>
        </Fragment>
    );
};
