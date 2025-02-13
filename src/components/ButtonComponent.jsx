import React from 'react';

const ButtonComponent = ({ type, onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className="button-component">
      {children}
    </button>
  );
};

export default ButtonComponent;