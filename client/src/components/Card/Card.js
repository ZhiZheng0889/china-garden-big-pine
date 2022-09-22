import React from 'react';

const Card = ({ padding, margin, children }) => {
  return (
    <article className={`${padding} ${margin} border broder-rounded`}>
      {children}
    </article>
  );
};

Card.defaultProps = {
  padding: 'p-3',
  margin: 'm-0',
};

export default Card;
