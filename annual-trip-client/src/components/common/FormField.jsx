import React from 'react';


const FormField = ({ label, name, value, onChange, type = "text", placeholder = "" }) => {
    return (
        <div className="form">
            <label className="label">{label}</label>
            <input
                className="input"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default FormField;