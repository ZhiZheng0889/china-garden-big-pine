import React from 'react';
import styles from './ErrorAlert.module.css';
function ErrorAlert({ error }) {
  console.log('=>', error);
  return (
    error &&
    error.message && <div className={styles.alert}>Error: {error.message}</div>
  );
}

export default ErrorAlert;
