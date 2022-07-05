import React from 'react';
import MainContentNav from './MainContentNav';

const MainContentHeader = () => {
  return (
    <header className="border-bottom p-">
      <div className="d-flex flex-column flex-md-row p-3 border-bottom">
        <div className="w-50">
          <h4>China Garden</h4>
          <p>Big pine shopping 1004</p>
        </div>
        <div className="w-50">
          <p className="text-success">We are open</p>
          <p>
            <i className="fa-solid fa-clock-five"></i> Open Seven Days a Week
          </p>
        </div>
      </div>
      <MainContentNav />
    </header>
  );
};

export default MainContentHeader;
