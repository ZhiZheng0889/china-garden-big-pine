import React from 'react';
import Card from '../Card/Card';
import MainContentHeader from './MainContentHeader';
import FoodList from '../FoodList/FoodList';
const MainContent = ({ query }) => {
  return (
    <Card>
      <MainContentHeader />
      <FoodList query={query} />
    </Card>
  );
};

export default MainContent;
