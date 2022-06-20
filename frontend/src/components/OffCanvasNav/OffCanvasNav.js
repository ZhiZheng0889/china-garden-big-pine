import React from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
const OffCanvasNav = () => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasNav"
      aria-labelledby="offcanvasNavLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavLabel">
          Devify
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <SideBar />
      </div>
    </div>
  );
};

export default OffCanvasNav;
