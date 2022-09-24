import React from 'react';

function ErrorAlert({ error }) {
  return (
    error && <div className="alert alert-danger">Error: {error.message}</div>
  );
}

export default ErrorAlert;
