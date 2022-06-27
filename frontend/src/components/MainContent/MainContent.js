import React from 'react';
import Card from '../Card/Card';
import MainContentHeader from './MainContentHeader';
import FoodList from '../FoodList/FoodList';
const MainContent = ({ query, cart, setCart }) => {
  return (
    <Card>
      <MainContentHeader />
      <FoodList query={query} setCart={setCart} />
    </Card>
  );
};

export default MainContent;
