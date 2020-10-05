import React from 'react';

const FormError = ({ children, errors, name }) => {
  const error = errors[name] || null;
  if (!error) return null;
  return <div className="alert danger">{children(error.message)}</div>;
};

export default FormError;
