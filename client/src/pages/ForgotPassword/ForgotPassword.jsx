import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import ErrorAlert from "../../errors/ErrorAlert";
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import { Validator } from "../../utils/Validator";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import { UserApi } from "../../api/userApi";
import { VerifyApi } from "../../api/verifyApi";
const ForgotPassword = ({ user, setUser }) => {
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [requestId, setRequestId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buttonText, setButtonText] = useState("Save");

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    ) {
      return true;
    }

    return false;
  };
  const changePasswordField = ({ target: { value } }) => {
    setPassword(value);
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setError(null);
    setButtonText("Loading...");

    // if (!validatePassword(password)) {
    //   setError({
    //     message:
    //       "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    //   });
    //   setButtonText("Continue");
    //   return;
    // }
    try {
      console.log("PHONE NUMBER: ", phoneNumber, password);
      const response = await UserApi.changePassword({ phoneNumber, password });
      console.log("RESPONSE: ", response);
    } catch (error) {
      setError(error);
    } finally {
      setButtonText("Save");
    }
  };

  const navigate = useNavigate();
  const cancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const search = async (event) => {
    event.preventDefault();
    setIsVerified(false);
    if (Validator.validatePhoneNumber(phoneNumber)) {
      const response = await VerifyApi.sendVerifyToPhoneNumber(
        phoneNumber,
        countryCode
      );
      if (response.request_id) {
        setRequestId(response.request_id);
      } else {
        throw new Error("Error authenticating phone number");
      }
    }
  };

  const submitPhoneNumber = () => {
    setRequestId(null);
    setIsVerified(true);
  };

  return (
    <div className="bg-slate-100 flex justify-center min-h-screen py-2 md:py-6">
      <Card classes="w-[30rem] md:mt-4 h-min">
        {error && error.message && (
          <div className="p-3">
            <ErrorAlert error={error} setError={setError} />
          </div>
        )}
        <div className="mb-3">
          <h1 className="text-center text-2xl font-semibold">China Garden</h1>
          <p className="text-center">Recover your account</p>
        </div>

        {isVerified ? (
          <form>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="capitalize">
                  Enter your new password
                </label>
                <div className="relative">
                  <input
                    onChange={changePasswordField}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                  />
                  <button
                    id="showPassword"
                    onClick={() => setShowPassword((curr) => !curr)}
                    className="absolute top-1/2 -translate-y-1/2 right-1 p-2"
                    type="button"
                  >
                    <i
                      className={`fa-solid text-neutral-600 ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="flex gap-3 items-center justify-start">
                <button
                  className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                  onClick={changePassword}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="capitalize">
                Enter your phone number
              </label>
              <PhoneInput
                state={phoneNumber}
                setState={setPhoneNumber}
                id="phoneNumber"
                placeholder="Phone Number"
                name="phoneNumber"
              />
              <div className="flex gap-3 items-center justify-start">
                <button
                  className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                  onClick={search}
                  disabled={!Validator.validatePhoneNumber(phoneNumber)}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        )}
      </Card>
      {requestId && (
        <AuthenticationModal
          requestId={requestId}
          setRequestId={setRequestId}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          submit={submitPhoneNumber}
          setIsVerified={setIsVerified}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
