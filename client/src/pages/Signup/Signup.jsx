import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import Form from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import ErrorAlertFixed from "../../errors/ErrorAlertFixed/ErrorAlertFixed";
import ReCAPTCHA from "react-google-recaptcha";
import { VerifyApi } from "../../api/verifyApi";
import "./App.css"; // Import your css file here
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import { Validator } from "../../utils/Validator";
const captchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Signup = ({ setUser }) => {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState("Continue");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const captchaRef = useRef(null);

  const changeFirstName = ({ target: { value } }) => {
    setFirstName(value);
  };

  const changePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const changeConfirmPassword = ({ target: { value } }) => {
    setConfirmPassword(value);
  };

  const verifyPhoneNumber = async (event) => {
    try {
      event.preventDefault();
      if (isVerified) {
        onSubmit();
        return;
      }
      setError(null);
      if (!Validator.validatePhoneNumber(phoneNumber)) {
        if (!phoneNumber) {
          throw new Error("A phone number is required.");
        }
        throw new Error(`Phone number: ${phoneNumber} is invalid`);
      }
      const response = await VerifyApi.sendVerifyToPhoneNumber(
        phoneNumber,
        countryCode
      );
      console.log("RESPONSE: ", response);
      if (response.request_id) {
        setRequestId(response.request_id);
      } else {
        throw new Error("Error validating phone number");
      }
    } catch (error) {
      setError(error.message);
    }
  };

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

  const onSubmit = async () => {
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
      // const token = captchaRef.current.getValue();
      // if (!token) {
      //   throw new Error("Please confirm you're not a robot");
      // }
      // const validToken = await VerifyApi.verifyCaptchaToken(token);
      // if (!validToken) {
      //   throw new Error("Invalid captcha Token");
      // }
      if (password === confirmPassword) {
        const payload = {
          password,
          firstName,
          phoneNumber,
          isAdmin: false,
        };
        const response = await UserApi.signup(payload);
        if (response) {
          setUser(response);
          navigate("/");
        }
      } else {
        throw { message: "Passwords are not matching. Please try again." };
      }
    } catch (error) {
      setError(error);
    } finally {
      setButtonText("Continue");
    }
  };

  console.log(isVerified);

  return (
    <>
      <div className="bg-slate-100 flex justify-center h-screen py-2 md:py-6">
        <Card classes="w-[30rem] md:mt-4 h-min">
          {error && (
            <ErrorAlertFixed error={error} setError={setError} showClose />
          )}
          <p className="text-center">Welcome to</p>
          <h1 className="text-center text-2xl font-semibold">China Garden</h1>
          <form onSubmit={verifyPhoneNumber} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="capitalize">
                Phone Number
              </label>
              <PhoneInput
                state={phoneNumber}
                setState={setPhoneNumber}
                id="phoneNumber"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="capitalize">
                First Name
              </label>
              <input
                onChange={changeFirstName}
                type="text"
                value={firstName}
                name="firstName"
                placeholder="First Name"
                id="firstName"
                className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="capitalize">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={changePassword}
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
            <div className="flex flex-col gap-2">
              <label htmlFor="passwordConfirm" className="capitalize">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onChange={changeConfirmPassword}
                  value={confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  id="passwordConfirm"
                  className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                />

                <button
                  id="showConfirmPassword"
                  onClick={() => setShowConfirmPassword((curr) => !curr)}
                  className="absolute top-1/2 -translate-y-1/2 right-1 p-2"
                  type="button"
                >
                  <i
                    className={`fa-solid text-neutral-600 ${
                      showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            {/* <div className="mb-[1.2rem]">
              <ReCAPTCHA sitekey={captchaKey} ref={captchaRef} />
            </div> */}
            <button
              type="submit"
              className={`w-full p-3 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800  focus:outline outline-2 outline-offset-2 outline-red-600`}
            >
              {buttonText}
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-red-900">
                Sign in here
              </Link>
            </p>
          </form>
        </Card>
      </div>
      {requestId && (
        <AuthenticationModal
          requestId={requestId}
          setRequestId={setRequestId}
          phoneNumber={phoneNumber}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          submit={onSubmit}
          setIsVerified={setIsVerified}
        />
      )}
    </>
  );
};

export default Signup;
