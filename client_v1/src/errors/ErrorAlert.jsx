import React from "react";
function ErrorAlert({ error, className, showClose, setError = () => {} }) {
  return (
    error &&
    error.message && (
      <div
        className={`${
          showClose ? "pl-3 pr-1 py-2" : "p-3"
        } bg-red-200 border rounded border-red-700 text-red-700 ${className} relative`}
        data-test-id="error-alert"
      >
        Error: {error.message}
        {showClose && (
          <button
            className="absolute right-1 top-2/4 -translate-y-2/4 w-9 h-9 rounded hover:bg-red-300 actve:bg-red-400"
            onClick={() => setError(null)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
    )
  );
}

ErrorAlert.defaultProps = {
  classes: "",
};

export default ErrorAlert;
