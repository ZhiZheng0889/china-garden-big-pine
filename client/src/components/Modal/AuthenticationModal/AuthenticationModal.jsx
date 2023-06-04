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
  const [verifyText, setVerifyText] = useState("Verify");

  const handleCodeChange = ({ target: { value } }) => {
    setCode(value);
  };

  const onVerifySubmit = async (event) => {
    try {
      setError(null);
      setVerifyText("Loading");
      event.preventDefault();
      const response = await VerifyApi.verifyPhoneNumber(requestId, code);
      console.log(response);
      if (response.status === "0") {
        submitOrder();
      } else {
        throw new Error("Error Verifying Phone Number");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifyText("Verify");
    }
  };

  const resendNewOTP = async (event) => {
    try {
    } catch (err) {
      setError(err);
    } finally {
      setVerifyText("Verify");
    }
  };
  console.log("REQUEST ID: ", requestId);
  return (
    requestId && (
      <>
        <div className="modalBackdrop" onClick={() => setRequestId(null)}></div>
        <article
          className="modal w-11/12 md:max-w-xl max-h-[95%] overflow-y-scroll bg-white border md:rounded"
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
                <p className="text-neutral-700">
                  Please enter the verification code sent to{" "}
                  <b className="text-black">{"(910)200-6686"}</b>
                </p>
                <p>
                  Didn't get a code?{" "}
                  <button className="text-red-600 font-semibold underline">
                    Resend One Time Code
                  </button>
                </p>
              </div>
              <form onClick={onVerifySubmit} className="pb-3">
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
                  disabled={verifyText !== "Verify"}
                >
                  {verifyText}
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
