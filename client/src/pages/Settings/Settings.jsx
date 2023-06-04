import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ErrorAlert from "../../errors/ErrorAlert";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import { storage } from "../../utils/Storage";
import AuthenticationModal from "../../components/Modal/AuthenticationModal/AuthenticationModal";
import { VerifyApi } from "../../api/verifyApi";
const Settings = ({ user, setUser }) => {
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate("/");
  }
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [requestId, setRequestId] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [countryCode, setCountryCode] = useState("1");
  const [isLoadingPasswordChanges, setIsLoadingPasswordChanges] =
    useState(false);
  const [showSuccessPasswordChange, setShowSuccessPasswordChange] =
    useState(false);
  useState(false);
  let abortController = null;
  const editField = (event) => {
    event.preventDefault();
    setIsEditingFirstName(true);
  };

  const cancelEdit = (event) => {
    event.preventDefault();
    setIsEditingFirstName(false);
    if (abortController) {
      abortController.abort();
    }
  };

  useEffect(() => {
    if (user?.firstName) {
      setFirstName(user.firstName ?? "");
    }
  }, [user]);

  const saveChanges = async (event) => {
    try {
      event.preventDefault();
      setError(null);
      setLoadingChanges(false);
      abortController = new AbortController();
      const refreshToken = storage.local.get("refreshToken");
      const response = await UserApi.updateUser({
        fields: { firstName },
        refreshToken,
      });
      setUser(response);
      setFirstName(response.firstName);
      setIsEditingFirstName(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingChanges(false);
    }
  };

  const resetPassword = () => {
    setIsChangingPassword(true);
    setRequestId(null);
  };

  const changeNewPassword = ({ target: { value } }) => {
    setNewPassword(value);
  };

  const changeNewPasswordConfirm = ({ target: { value } }) => {
    setNewPasswordConfirm(value);
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

  const cancelChangePassword = () => {
    setIsChangingPassword(false);
    setNewPassword("");
    setNewPasswordConfirm("");
    setError(null);
  };

  const verifyPhoneNumber = async () => {
    try {
      setError(null);
      const response = await VerifyApi.sendVerifyToPhoneNumber(
        user.phoneNumber,
        countryCode
      );
      if (response.request_id) {
        setRequestId(response.request_id);
      } else {
        throw new Error("Error validating phone number");
      }
    } catch (err) {
      setError(err);
    }
  };

  const saveChangePassword = async () => {
    try {
      setError(null);
      setIsLoadingPasswordChanges(true);
      setShowSuccessPasswordChange(false);
      if (newPassword !== newPasswordConfirm) {
        throw new Error("Passwords are not matching");
      }
      // if (!validatePassword(password)) {
      //   throw new Error(
      //     "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      //   );
      // }
      await UserApi.changePassword({
        password: newPassword,
        user_id: user._id,
      });
      setIsChangingPassword(false);
      setShowSuccessPasswordChange(true);
      setNewPassword("");
      setNewPasswordConfirm("");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoadingPasswordChanges(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-100 py-6">
        <section className="mx-auto max-w-2xl flex-flex-col gap-4">
          <Card padding="p-0">
            <header className="p-3 border-b">
              <h2 className="font-semibold text-2xl">Settings</h2>
            </header>
            {error && error.message && (
              <div className="p-3">
                <ErrorAlert error={error} setError={setError} />
              </div>
            )}
            {showSuccessPasswordChange && (
              <div className="m-3 p-3 bg-emerald-200 border rounded border-emerald-700 text-emerald-700 flex items-center gap-3 relative">
                <p>Password Successfully Changed</p>
                <button
                  className="absolute right-2 top-2/4 -translate-y-2/4 w-9 h-9 rounded hover:bg-emerald-300 actve:bg-emerald-400"
                  onClick={() => setShowSuccessPasswordChange(false)}
                >
                  X
                </button>
              </div>
            )}
            <div>
              <div className="p-3">
                <h3 className="font-semibold text-xl">Profile</h3>
              </div>

              <form className="px-3 flex flex-col gap-3">
                <div>
                  <label htmlFor="firstName" className="mb-1">
                    First Name
                  </label>
                  {isEditingFirstName ? (
                    <div className="flex flex-col gap-1">
                      <input
                        type="text"
                        id="firstName"
                        className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                        value={firstName}
                        onChange={({ target: { value } }) =>
                          setFirstName(value)
                        }
                        placeholder="First Name..."
                      />
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center">
                      <p className="flex-1 border-b p-2">{user.firstName}</p>
                      <button
                        className="border rounded w-10 h-10 flex items-center justify-center duration-200 ease-out hover:bg-neutral-100 active:bg-neutral-200"
                        data-field="firstName"
                        onClick={editField}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  )}
                </div>

                {isEditingFirstName && (
                  <div className="flex gap-3 items-center">
                    <button
                      className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                      disabled={loadingChanges}
                      onClick={saveChanges}
                    >
                      {loadingChanges ? "Loading" : "Save"}
                    </button>
                  </div>
                )}
              </form>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-xl">Account</h3>
            </div>
            <div className="pl-3 pb-3 pr-3">
              <div className="flex items-center">
                {user.isPhoneNumberVerified ? (
                  <div className="flex items-center pb-3 gap-1">
                    <p>
                      Your Phone number is verified{" "}
                      <span className="text-emerald-700">
                        <i className="fa-solid fa-circle-check"></i>
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col pb-3">
                    <div className="flex items-center">
                      <p>Your phone number is not verified</p>{" "}
                      <span className="text-red-600 ml-1">
                        <i className="fa-solid fa-circle-xmark"></i>
                      </span>
                    </div>
                    <p className="text-sm">
                      **Whenever you place an order using the phone number
                      associated with the account, it will automatically verify
                      the phone number**
                    </p>
                  </div>
                )}
              </div>
              {isChangingPassword ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="capitalize">
                      Enter a new password
                    </label>
                    <div className="relative">
                      <input
                        onChange={changeNewPassword}
                        value={newPassword}
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        placeholder="New Password"
                        id="password"
                        className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                      />
                      <button
                        id="showPassword"
                        onClick={() => setShowNewPassword((curr) => !curr)}
                        className="absolute top-1/2 -translate-y-1/2 right-1 p-2"
                        type="button"
                      >
                        <i
                          className={`fa-solid text-neutral-600 ${
                            showNewPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="passwordConfirm" className="capitalize">
                      Confirm new password
                    </label>
                    <div className="relative">
                      <input
                        onChange={changeNewPasswordConfirm}
                        value={newPasswordConfirm}
                        type={showNewPasswordConfirm ? "text" : "password"}
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        id="passwordConfrim"
                        className="w-full p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                      />
                      <button
                        id="showPasswordConfirm"
                        onClick={() =>
                          setShowNewPasswordConfirm((curr) => !curr)
                        }
                        className="absolute top-1/2 -translate-y-1/2 right-1 p-2"
                        type="button"
                      >
                        <i
                          className={`fa-solid text-neutral-600 ${
                            showNewPasswordConfirm ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      className="px-3 py-2 rounded w-24 hover:bg-neutral-100 active:bg-neutral-200 duration-200 ease-out"
                      onClick={cancelChangePassword}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-red-600 text-white w-24 hover:bg-red-700 active:bg-red-800 duration-200 ease-out disabled:cursor-not-allowed disabled:bg-red-400"
                      disabled={isLoadingPasswordChanges}
                      onClick={saveChangePassword}
                    >
                      {isLoadingPasswordChanges ? "Loading" : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800 duration-200 ease-out"
                  onClick={verifyPhoneNumber}
                >
                  Reset Password
                </button>
              )}
            </div>
          </Card>
        </section>
      </main>
      {requestId && (
        <AuthenticationModal
          requestId={requestId}
          setRequestId={setRequestId}
          phoneNumber={user.phoneNumber}
          submitOrder={resetPassword}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          user={user}
          setUser={setUser}
          isDiffFromUserNumber={true}
        />
      )}
    </>
  );
};

export default Settings;
