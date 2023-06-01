import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VerifyApi } from "../../../api/verifyApi";
import { userContext } from "../../../context/UserContext";
import ErrorAlert from "../../../errors/ErrorAlert";
import Input from "../../Form/Input/Input";
const AuthenticationModal = ({
  phoneNumber,
  submitOrder,
  requestId,
  setRequestId,
  countryCode,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleCodeChange = ({ target: { value } }) => {
    setCode(value);
  };

  const onSubmit = async (event) => {
    try {
      setError(null);
      event.preventDefault();
      const response = await VerifyApi.sendVerifyToPhoneNumber(
        countryCode + phoneNumber
      );
      console.log(response);
      if (response.request_id) {
        setRequestId(response.request_id);
      } else {
        throw new Error("Error sending request");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onVerifySubmit = async (event) => {
    try {
      setError(null);
      event.preventDefault();
      const response = await VerifyApi.verifyPhoneNumber(requestId, code);
      console.log(response);
      if (response.status === "0") {
        submitOrder();
      } else {
        throw new Error("Error Verifying Phone Number");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    requestId && (
      <>
        <div className="modalBackdrop" onClick={() => setRequestId(null)}></div>
        <article
          className="modal w-11/12 md:max-w-2xl max-h-[95%] overflow-y-scroll bg-white border md:rounded"
          id="foodModal"
          aria-labelledby="foodModalLabel"
          aria-hidden={requestId ? true : false}
        >
          <header className="flex items-center p-3 border-b">
            <button
              type="button"
              className="w-10 h-10 hover:bg-slate-100 rounded-full  focus:outline outline-2 outline-offset-2 outline-red-600"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setRequestId(null)}
            >
              <i className="fa-solid fa-xmark fa-lg"></i>
            </button>
          </header>
          <section className="p-3">
            <div className="py-2">
              <ErrorAlert error={error} />
            </div>
            <div className="flex flex-col gap-3 items-center">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">
                  Verify Phone Number
                </h3>
                <p className="text-neutral-700 text-sm">
                  Please enter the verification code sent to{" "}
                  <b className="text-black">{phoneNumber}</b>
                </p>
              </div>
              <form onClick={onVerifySubmit}>
                <Input
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Enter OTP Code"
                  type="text"
                  name="code"
                  label=""
                />
                <button
                  type="submit"
                  className="w-full rounded text-center p-3 md:p-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white sm:rounded focus:outline outline-2 outline-offset-2 outline-red-600 disabled:bg-red-800 disabled:cursor-not-allowed"
                >
                  Verify
                </button>
              </form>
            </div>
          </section>
        </article>
      </>
    )
  );
};

export default AuthenticationModal;

// <>
//         <div className="modalBackdrop"></div>
//         <article className="bg-white border rounded modal">
//           <ErrorAlert error={error} />
//           <header className="flex items-center p-3 border-b">
//             <button
//               type="button"
//               className="w-10 h-10 hover:bg-slate-100 rounded-full"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <i className="fa-regular fa-xmark fa-2x"></i>
//             </button>
//           </header>
//           {sentRequestId || requestId ? (
//             <section className="p-3">
//               <h2 className="text-xl font-semibold text-center">
//                 Verification Code
//               </h2>
//               <p className="text-center max-w-4 mb-4">
//                 Please enter the code sent to {phoneNumber}
//               </p>
//               <form className="flex flex-col gap-3" onSubmit={onVerifySubmit}>
//                 <input
//                   type="text"
//                   value={code}
//                   onChange={handleCodeChange}
//                   placeholder="Enter Verification Code"
//                 />

//                 <button
//                   type="submit"
//                   className=" max-w-14 p-3 rounded bg-red-600 text-white disabled:bg-red-500 disabled:cursor-not-allowed"
//                 >
//                   Verify
//                 </button>
//               </form>
//             </section>
//           ) : (
//             <section className="p-3">
//               <h2 className="text-xl font-semibold text-center">
//                 Lets Verify Your Phone Number
//               </h2>
//               <p className="text-center max-w-4 mb-4">
//                 Please select your Country code & your Phone Number
//               </p>

//               <form className="flex flex-col gap-3" onSubmit={onSubmit}>
//                 <div className="flex gap-3 justify-center">
//                   <select
//                     name="country-prefix"
//                     value={countryCode}
//                     onChange={handleCountryChange}
//                   >
//                     <option value="1">+1</option>
//                   </select>
//                   <input
//                     type="tel"
//                     className="border rounded p-1"
//                     required
//                     placeholder="1234567890"
//                     value={phoneNumber}
//                     onChange={handlePhoneChange}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className=" max-w-14 p-3 rounded bg-red-600 text-white disabled:bg-red-500 disabled:cursor-not-allowed"
//                   disabled={phoneNumber.length === 0}
//                 >
//                   Send
//                 </button>
//               </form>
//             </section>
//           )}
//         </article>
//       </>
