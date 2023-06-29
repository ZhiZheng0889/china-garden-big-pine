import React from "react";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="text-black animate-spin ease-out">
        <i className="fa-solid fa-spinner"></i>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
