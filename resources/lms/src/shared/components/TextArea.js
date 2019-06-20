import React from 'react';

export default ({input, label, type, rows, cols, placeholder, meta: {touched, error, warning}}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <div>
                <textarea cols={cols} rows={rows} {...input} placeholder={`${label}`} className="form-control"
                          autoComplete="off"/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
