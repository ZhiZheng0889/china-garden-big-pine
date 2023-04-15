import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VerifyApi } from "../../../api/verifyApi";
import { userContext } from "../../../context/UserContext";
import ErrorAlert from "../../../errors/ErrorAlert";
const AuthenticationModal = ({
  phoneNumber,
  setPhoneNumber,
  isOpen,
  setIsOpen,
  submitOrder,
}) => {
  const changeNumber = ({ target: { value } }) => {
    setPhoneNumber(value);
  };

  return (
    isOpen && (
      <>
        <div className="modalBackdrop"></div>
        <article className="modal bg-white border fixed t-0 w-screen top-0 bottom-0 z-30 ease-out duration-300">
          <header className="p-2 flex border-b">
            <button
              type="button"
              className="ml-auto w-10 h-10 hover:bg-slate-100 rounded-full"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-regular fa-xmark fa-lg"></i>
            </button>
          </header>
          <section className="p-3 flex flex-col gap-3 items-center">
            <h2 className="text-lg text-center font-semibold">
              Enter your phone number
            </h2>
            <form>
              <input
                type="text"
                onChange={changeNumber}
                className="p-2 rounded border w-full md:w-[18rem]"
                placeholder="Enter your phone number..."
                value={phoneNumber}
              />
            </form>
            <button
              className="w-[12rem] text-center p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded"
              disabled={phoneNumber.length === 0}
              onClick={submitOrder}
            >
              Submit Order
            </button>
          </section>
        </article>
      </>
    )
  );
};

export default AuthenticationModal;
