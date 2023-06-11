import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import ErrorAlert from "../../errors/ErrorAlert";
import PhoneInput from "../../components/Form/PhoneInput/PhoneInput";
import { Validator } from "../../utils/Validator";
const ForgotPassword = ({ user, setUser }) => {
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const cancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const search = (event) => {
    event.preventDefault();
    if (Validator.validatePhoneNumber(phoneNumber)) {
    }
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

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <labe htmlFor="phoneNumber" className="capitalize">
              Enter your phone number
            </labe>
            <PhoneInput
              state={phoneNumber}
              setState={setPhoneNumber}
              id="phoneNumber"
              placeholder="Phone Number"
              name="phoneNumber"
            />
            <div className="flex gap-3 items-center justify-end">
              <button
                className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                onClick={search}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
