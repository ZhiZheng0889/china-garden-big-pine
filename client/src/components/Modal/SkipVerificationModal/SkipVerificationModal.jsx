import React from "react";

const SkipVerificationModal = ({ isOpen, setIsOpen }) => {
  return (
    isOpen && (
      <>
        <div className="modalBackdrop" onClick={() => setIsOpen(false)}></div>
        <article
          className="modal w-11/12 md:max-w-xl max-h-[95%] bg-white border md:rounded"
          id="verificationModal"
          aria-hidden={isOpen}
        >
          <header className="flex items-center p-3 border-b">
            <button
              type="button"
              className="w-10 h-10 hover:bg-slate-100 rounded-full  focus:outline outline-2 outline-offset-2 outline-red-600"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-solid fa-xmark fa-lg"></i>
            </button>
          </header>
          <section className="p-3">
            <h3 className="text-center text-xl font-semibold">
              We currently unable to process your phone number
            </h3>
            <p className="text-center">
              We are currently unable to process your phone number. To finish
              your order. Please call into the store at{" "}
              <b>
                <a href="tel:3058728861">(305)872-8861</a>
              </b>{" "}
              or use a different phone number.
            </p>
          </section>
        </article>
      </>
    )
  );
};

export default SkipVerificationModal;
