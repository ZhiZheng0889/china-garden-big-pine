import React, { useContext, useEffect, useState } from "react";
import { VerifyApi } from "../../../api/verifyApi";
import { userContext } from "../../../context/UserContext";
import ErrorAlert from "../../../errors/ErrorAlert";
const AuthenticationModal = ({
  isModalOpen,
  setIsModalOpen,
  user,
  setUser,
  phoneNumber,
  setPhoneNumber,
  submitOrder,
  sentRequestId,
}) => {
  const [countryCode, setCountryCode] = useState("1");
  const [requestId, setRequestId] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (user?.user_id) {
  //     (async () => {
  //       try {
  //         setError(null);
  //         const response = await VerifyApi.sendVerifyToPhoneNumber(
  //           user.phoneNumber
  //         );
  //         console.log(response);
  //         if (response.request_id) {
  //           setRequestId(response.request_id);
  //         } else {
  //           throw new Error("Error sending request");
  //         }
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     })();
  //   }
  // }, [user]);

  const handlePhoneChange = ({ target: { value } }) => {
    if (!value.match(/[a-z]/i)) {
      if (value.length <= 3) {
        setPhoneNumber(value);
      } else {
        const tempValue = value;
        if (value.length >= 4) {
          console.log(tempValue.split(""));
          tempValue.split("").splice(3, 0, "-").join("");
          setPhoneNumber(tempValue);
        }
        if (value.length >= 7) {
          tempValue.split("").splice(7, 0, "-").join("");
          setPhoneNumber(tempValue);
        }
      }
    }
  };

  const handleCountryChange = ({ target: { value } }) => {
    setCountryCode(value);
  };

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
      const response = await VerifyApi.verifyPhoneNumber(
        sentRequestId ? sentRequestId : requestId,
        code,
        user?.user_id
      );
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

  // console.log(requestId);

  return (
    isModalOpen && (
      <>
        <div className="modalBackdrop"></div>
        <article className="bg-white border rounded modal">
          <ErrorAlert error={error} />
          <header className="flex items-center p-3 border-b">
            <button
              type="button"
              className="w-10 h-10 hover:bg-slate-100 rounded-full"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="fa-regular fa-xmark fa-2x"></i>
            </button>
          </header>
          {sentRequestId || requestId ? (
            <section className="p-3">
              <h2 className="text-xl font-semibold text-center">
                Verification Code
              </h2>
              <p className="text-center max-w-4 mb-4">
                Please enter the code sent to {phoneNumber}
              </p>
              <form className="flex flex-col gap-3" onSubmit={onVerifySubmit}>
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Enter Verification Code"
                />

                <button
                  type="submit"
                  className=" max-w-14 p-3 rounded bg-red-600 text-white disabled:bg-red-500 disabled:cursor-not-allowed"
                >
                  Verify
                </button>
              </form>
            </section>
          ) : (
            <section className="p-3">
              <h2 className="text-xl font-semibold text-center">
                Lets Verify Your Phone Number
              </h2>
              <p className="text-center max-w-4 mb-4">
                Please select your Country code & your Phone Number
              </p>

              <form className="flex flex-col gap-3" onSubmit={onSubmit}>
                <div className="flex gap-3 justify-center">
                  <select
                    name="country-prefix"
                    value={countryCode}
                    onChange={handleCountryChange}
                  >
                    <option value="1">+1</option>
                  </select>
                  <input
                    type="tel"
                    className="border rounded p-1"
                    required
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </div>

                <button
                  type="submit"
                  className=" max-w-14 p-3 rounded bg-red-600 text-white disabled:bg-red-500 disabled:cursor-not-allowed"
                  disabled={phoneNumber.length === 0}
                >
                  Send
                </button>
              </form>
            </section>
          )}
        </article>
      </>
    )
  );
};

export default AuthenticationModal;
