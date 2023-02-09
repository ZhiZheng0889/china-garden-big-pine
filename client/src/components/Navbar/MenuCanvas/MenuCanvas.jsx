import React from 'react';
import Card from '../../Card/Card';
import SideNav from '../../Nav/SideNav/SideNav';

const MenuCanvas = ({
  isBurgerOpen,
  setIsBurgerOpen,
  category,
  setCategory,
  is,
}) => {
  const closeCanvas = () => {
    setIsBurgerOpen(false);
  };
  return (
    <div
      className={`z-30 ease-out duration-300 ${
        isBurgerOpen ? 'left-0 block' : 'right-full hidden'
      }`}
    >
      <div className="modalBackdrop"></div>

      <Card
        classes={`z-50 w-5/12 top-0 h-screen absolute text-black ${
          isBurgerOpen ? 'left-0 block' : 'right-full hidden'
        }`}
        borderRadius=""
        padding="p-0"
      >
        <div className="flex border-b p-3">
          <button className="p-1 ml-auto" onClick={closeCanvas}>
            <i class="fa-solid fa-x" onClick={closeCanvas}></i>
          </button>
        </div>
        <SideNav category={category} setCategory={setCategory} />
      </Card>
    </div>
  );
};

export default MenuCanvas;
