import React from 'react';
import Card from '../Card/Card';
import MainContentHeader from './MainContentHeader';
import FoodList from '../FoodList/FoodList';
const MainContent = () => {
  return (
    <Card>
      <MainContentHeader />
      <FoodList />
    </Card>
  );
};

export default MainContent;
