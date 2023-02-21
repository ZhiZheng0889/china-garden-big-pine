import React, { useState } from 'react';
import { VerifyApi } from '../../../api/verifyApi';
import ErrorAlert from '../../../errors/ErrorAlert';
const AuthenticationModal = ({
  isModalOpen,
  setIsModalOpen,
  user,
  setUser,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const [requestId, setRequestId] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const handlePhoneChange = ({ target: { value } }) => {
    if (!value.match(/[a-z]/i)) {
      console.log(value);
      console.log(typeof value);
      if (value.length <= 3) {
        setPhoneNumber(value);
      } else {
        const tempValue = value;
        console.log(value, typeof value);
        if (value.length >= 4) {
          console.log(tempValue.split(''));
          tempValue.split('').splice(3, 0, '-').join('');
          setPhoneNumber(tempValue);
        }
        if (value.length >= 7) {
          tempValue.split('').splice(7, 0, '-').join('');
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
      console.log(phoneNumber, countryCode);
      const response = await VerifyApi.sendVerifyToPhoneNumber(
        countryCode + phoneNumber
      );
      console.log(response);
      if (response.requestId) {
        setRequestId(response.requestId);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onVerifySubmit = async (event) => {
    try {
      setError(null);
      event.preventDefault();
      const response = await VerifyApi.verifyPhoneNumber;
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(requestId);

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
          {requestId ? (
            <section className="p-3">
              <h2 className="text-xl font-semibold text-center">
                Verification Code
              </h2>
              <p className="text-center max-w-4 mb-4">
                Please enter the code sent to {phoneNumber}
              </p>
              <form
                className="flex flex-col gap-3"
                onSubmit={onAfterVerifySubmit}
              >
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
