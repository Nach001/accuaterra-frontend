import React from 'react';

function InputCustomComponent({ name, value, onChange, placeholder, error, type }) {
  return (
    <div className="input-component">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default InputCustomComponent;