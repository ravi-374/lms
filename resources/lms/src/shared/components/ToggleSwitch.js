import React, {Fragment} from 'react';
import './Component.scss';

export default ({input, label, checked = false}) => {
    return (
        <Fragment>
            {label ? <span className="toggle-label">{label}</span> : null}
            <label className="switch switch-label switch-primary">
                <input type="checkbox" className="switch-input" checked={checked} {...input}/>
                <span className="switch-slider" data-checked="&#x2713;" data-unchecked="&#x2715;"/>
            </label>
        </Fragment>
    );
};
