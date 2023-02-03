import React from 'react';

export const formatSpecialRequest = (request) => {
  // check if \n is in request and if so format correctly
  const index = request.indexOf('\n');
  if (index >= 0) {
    return request.split('\n').map((singleRequest, index) => {
      if (singleRequest) {
        return (
          <p className="specialRequest" key={singleRequest + index}>
            "{singleRequest}"
          </p>
        );
      }
    });
  } else {
    return <p className="specialRequest">"{request}"</p>;
  }
};
