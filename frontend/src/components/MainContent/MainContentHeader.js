import React from 'react';
import MainContentNav from './MainContentNav';

const MainContentHeader = () => {
  return (
    <header>
      <div className="d-flex p-3 border-bottom">
        <div className="w-50">
          <h4>China Garden</h4>
          Big pine shopping 1004
        </div>
        <div className="w-50">
          <p className="text-success">We are open</p>
          <p>
            <i class="fa-solid fa-clock-five"></i> Open Seven Days a Week
          </p>
        </div>
      </div>
      <MainContentNav />
    </header>
  );
};

export default MainContentHeader;
