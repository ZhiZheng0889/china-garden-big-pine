import React from 'react';
import styles from './ErrorAlert.module.css';
function ErrorAlert({ error }) {
  return error && <div className={styles.alert}>Error: {error.message}</div>;
}

export default ErrorAlert;
