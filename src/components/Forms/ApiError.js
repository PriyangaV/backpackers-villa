import React from 'react';

const ApiError = ({ errors }) => {
  return (
    <>
      {errors && errors.length > 0 && (
        <>
          {errors.map((error) => {
            return (
              <div className="alert-danger-box" key={error.title}>
                {error.detail}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default ApiError;
