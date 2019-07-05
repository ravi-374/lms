import React from 'react';

export default ({input, label, required, rows, cols, placeholder, meta: {touched, error}}) => {
    const className = `${touched && error ? 'form-control is-invalid' : 'form-control'}`;
    const labelClass = required ? 'control-label' : ' ';
    return (
        <div className="form-group">
            <label className={labelClass}>{label}</label>
            <div>
                <textarea cols={cols} rows={rows} required={required} {...input} placeholder={`${label}`}
                          className={className}
                          autoComplete="off"/>
                {touched && ((error && <span className="text-danger" style={{fontSize: '80%'}}>{error}</span>))}
            </div>
        </div>
    );
};
