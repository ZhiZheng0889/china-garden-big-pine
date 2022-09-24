import React from 'react';

const Loading = ({ padding }) => {
  return (
    <div className={`d-flex justify-content-center ${padding}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  padding: 'p-0',
};

export default Loading;
