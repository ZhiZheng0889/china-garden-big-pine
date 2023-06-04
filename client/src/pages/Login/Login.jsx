import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../../errors/ErrorAlert";
import { UserApi } from "../../api/userApi";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Card from "../../components/Card/Card";
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import { storage } from "../../utils/Storage";

const Login = ({ setUser }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const changePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const onSubmit = async (event) => {
    setError(null);
    event.preventDefault();
    setButtonText("Loading...");
    try {
      const response = await UserApi.login({ phoneNumber, password });
      if (response) {
        storage.local.set("refreshToken", response.refreshToken);
        delete response.refreshToken;
        setUser(response);
        navigate("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setButtonText("Continue");
    }
  };
  return (
    <div className="bg-slate-100 flex justify-center h-screen  py-2 md:py-6">
      <Card classes="w-[30rem] md:mt-4 h-min">
        {error && <ErrorAlert error={error} classes="mb-2" />}
        <p className="text-center">Welcome back to</p>
        <h1 className="text-center text-2xl font-semibold">China Garden</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="capitalize">
              Phone Number
            </label>
            <PhoneInput
              state={phoneNumber}
              setState={setPhoneNumber}
              id="phoneNumber"
              placeholder="Phone Number"
              name="phoneNumber"
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
          <button
            type="submit"
            className={`w-full p-3 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800  focus:outline outline-2 outline-offset-2 outline-red-600`}
          >
            {buttonText}
          </button>
          <p className="mt-2 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-900">
              Sign up here
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
