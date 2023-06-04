import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import ErrorAlert from "../../errors/ErrorAlert";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/userApi";
import { storage } from "../../utils/Storage";
const Settings = ({ user, setUser }) => {
  console.log("user: ", user);
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate("/");
  }
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
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
      console.log("EDITING");
      abortController = new AbortController();
      const refreshToken = storage.local.get("refreshToken");
      console.log("RT: ", refreshToken);
      const response = await UserApi.updateUser({
        fields: { firstName },
        refreshToken,
      });
      console.log("res: ", response);
      setUser(response);
      setFirstName(response.firstName);
      setIsEditingFirstName(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingChanges(false);
    }
  };

  const resetPassword = () => {};

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
                  <div className="flex items-center pb-3">
                    <p>
                      Verify your phone number{" "}
                      <button className="text-red-700 underline underline-offset-3">
                        Here
                      </button>
                    </p>{" "}
                  </div>
                )}
              </div>
              <button
                className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 active:bg-red-800 duration-200 ease-out"
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Settings;
