import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import Form from "../../components/Form/Form";
import Card from "../../components/Card/Card";
import ErrorAlertFixed from "../../errors/ErrorAlertFixed/ErrorAlertFixed";
import ReCAPTCHA from "react-google-recaptcha";
import { VerifyApi } from "../../api/verifyApi";
const captchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const Signup = ({ setUser }) => {
  const [signup, setSignup] = useState({
    email: "",
    first_name: "",
    phone_number: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState("Continue");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const captchaRef = useRef(null);

  const onChange = ({ target }) => {
    const { name, value } = target;
    if (name === "password") {
      setPassword(value);
    } else {
      setSignup({
        ...signup,
        [name]: value,
      });
    }
  };

  const changeConfirmPassword = ({ target }) => {
    const { value } = target;
    setConfirmPassword(value);
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

  const footerText = (
    <p className="mt-2 text-center">
      Already have an account?{" "}
      <Link to="/login" className="text-red-900">
        Sign in here
      </Link>
    </p>
  );

  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText("Loading...");

    // Validate password
    if (!validatePassword(password)) {
      // Changed from signup.password to password
      setError({
        message:
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
      setButtonText("Continue");
      return;
    }

    try {
      const token = captchaRef.current.getValue();
      if (!token) {
        throw new Error("No captcha token provided");
      }
      const validToken = await VerifyApi.verifyCaptchaToken(token);
      if (!validToken) {
        throw new Error("Invalid captcha Token");
      }
      if (password === confirmPassword) {
        const {
          email,
          first_name: firstName,
          phone_number: phoneNumber,
        } = signup;
        const payload = {
          email,
          password,
          firstName,
          phoneNumber,
          isAdmin: false,
          recaptchaResponse: recaptchaToken,
        };
        console.log("PAYLOAD: ", payload);
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

  const signupWithSocials = () => {};

  return (
    <div className="bg-slate-100 flex justify-center h-screen py-2 md:py-6">
      <Card classes="w-[30rem] md:mt-4 h-min">
        {error && (
          <ErrorAlertFixed error={error} setError={setError} showClose />
        )}
        <p className="text-center">Welcome to</p>
        <h1 className="text-center text-2xl font-semibold">China Garden</h1>
        <Form
          data={signup}
          onChange={onChange}
          onSubmit={onSubmit}
          footer={footerText}
          submitText={buttonText}
        >
          <div>
            <div className="flex flex-col mb-[1.2rem]">
              <label htmlFor="password" className="capitalize mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={onChange}
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
                >
                  <i
                    className={`fa-solid text-neutral-600 ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-[1.2rem]">
              <label htmlFor="passwordConfirm" className="capitalize mb-2">
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
                >
                  <i
                    className={`fa-solid text-neutral-600 ${
                      showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="mb-[1.2rem]">
              <ReCAPTCHA sitekey={captchaKey} ref={captchaRef} />
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
