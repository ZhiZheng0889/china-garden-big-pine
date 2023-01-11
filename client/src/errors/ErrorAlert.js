import React from 'react';
import styles from './ErrorAlert.module.css';
function ErrorAlert({ error, classes, showClose, setError = () => {} }) {
  return (
    error &&
    error.message && (
      <div className={`${styles.alert} ${classes} relative`}>
        Error: {error.message}
        {showClose && (
          <button
            className="absolute right-5 top-2/4 -translate-y-2/4"
            onClick={() => setError(null)}
          >
            X
          </button>
        )}
      </div>
    )
  );
}

ErrorAlert.defaultProps = {
  classes: '',
};

export default ErrorAlert;
