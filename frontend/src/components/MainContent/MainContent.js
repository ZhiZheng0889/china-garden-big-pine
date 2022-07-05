import React, { useState } from 'react';
import Card from '../Card/Card';
import MainContentHeader from './MainContentHeader';
import FoodList from '../FoodList/FoodList';
import ErrorAlert from '../../errors/ErrorAlert';
const MainContent = ({ query, cart, setCart }) => {
  const [error, setError] = useState(null);
  return (
    <Card padding={'p-0'}>
      <div className="p-3 pb-0">
        <ErrorAlert error={error} />
      </div>
      <MainContentHeader />
      <FoodList
        query={query}
        setCart={setCart}
        cart={cart}
        setError={setError}
        error={error}
      />
    </Card>
  );
};

export default MainContent;
