import React, { useEffect, useRef, useState } from 'react';
import styles from './OpenedMenu.module.css';
const OpenedMenu = ({ category, changeCategory }) => {
  const categories = [
    'appetizers',
    'soup',
    'drinks',
    'side_orders',
    'fried_rice',
    'diet_dishes',
    'lo_mein_or_chow_mei_fun',
    'chicken',
    'pork',
    'beef',
    'chow_mein',
    'chop_suey',
    'egg_foo_young',
    'sweet_and_sour',
    'seafood',
    'chef_special',
    'combo',
    'lunch',
  ];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const navbarRef = useRef(null);
  const scrollAmount = 250;
  const scroll = ({ target: { id } }) => {
    if (id === 'scroll-left') {
      setScrollPosition((prev) => prev - scrollAmount);
    } else {
      setScrollPosition((prev) => prev + scrollAmount);
    }
  };

  useEffect(() => {
    navbarRef.current.scrollLeft = scrollPosition;
  }, [scrollPosition]);

  return (
    <div className={`flex items-start relative`}>
      {/* <button onClick={() => setOpenNav((curr) => !curr)}>
        <i className="fa-solid fa-list py-3 pl-3 pr-2"></i>
      </button> */}
      <button
        className={`absolute top-1 py-1 px-3 ${styles.buttonLeft} ${
          openNav && 'hidden'
        }`}
        id="scroll-left"
        onClick={scroll}
      >
        <i className="fa-regular fa-chevrons-left" id="scroll-left"></i>
      </button>
      <ul
        className={`px-10 flex overflow-x-scroll w-full ${
          openNav && 'flex-wrap'
        } ${styles.ul} border-bottom`}
        ref={navbarRef}
      >
        {categories.map((cat) => {
          const text = cat
            .split('_')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(' ');
          return (
            <li className="py-2 whitespace-nowrap" key={cat}>
              <button
                id={cat}
                className={`${category === cat ? styles.active : ''}`}
                onClick={changeCategory}
              >
                {text}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={`absolute right-0  top-1 py-1 px-3 ${styles.buttonRight}  ${
          openNav && 'hidden'
        }`}
        id="scroll-right"
        onClick={scroll}
      >
        <i className="fa-regular fa-chevrons-right" id="scroll-right"></i>
      </button>
    </div>
  );
};

export default OpenedMenu;
