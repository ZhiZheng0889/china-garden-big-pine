import React, { useContext, useState } from "react";
import Card from "../../components/Card/Card";
import { userContext } from "../../context/UserContext";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
import { useNavigate } from "react-router-dom";

const Settings = ({ user, setUser }) => {
  console.log(user);
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate("/");
  }
  const [isEditing, setIsEditing] = useState({
    firstName: false,
  });
  const editProfile = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-setting");
    console.log("key: ", key);
    setIsEditing((curr) => {
      return { ...curr, [key]: true };
    });
  };
  const changeProfile = ({ target: { value, id } }) => {
    setUser((curr) => {
      return { ...curr, [id]: value };
    });
  };
  const cancelChanges = () => {};
  return (
    <>
      <main className="min-h-screen bg-slate-100 py-6">
        <section className="mx-auto max-w-2xl flex-flex-col gap-4">
          <Card padding="p-0">
            <header className="p-3 border-b">
              <h3 className="font-semibold text-xl">Settings</h3>
            </header>
            <form className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName">First Name</label>
                {isEditing.firstName ? (
                  <input
                    type="text"
                    id="firstName"
                    className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                    value={user.firstName}
                    placeholder="First Name..."
                    onChange={changeProfile}
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-neutral-500">{user.firstName}</p>
                    <button
                      className="w-10 h-10 ease-out duration-200 flex justify-center items-center rounded hover:bg-neutral-100 active:bg-neutral-200"
                      data-setting="firstName"
                      onClick={editProfile}
                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        data-setting="firstName"
                      ></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                {isEditing.email ? (
                  <input
                    type="email"
                    id="email"
                    className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                    value={user.email}
                    placeholder="Email..."
                    onChange={changeProfile}
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-neutral-500">{user.email}</p>
                    <button
                      className="w-10 h-10 ease-out duration-200 flex justify-center items-center rounded hover:bg-neutral-100 active:bg-neutral-200"
                      data-setting="email"
                      onClick={editProfile}
                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        data-setting="email"
                      ></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber">Phone Number</label>
                {isEditing.phoneNumber ? (
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                    value={user.phoneNumber}
                    placeholder="Phone Number..."
                    onChange={changeProfile}
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-neutral-500">{user.phoneNumber}</p>
                    <button
                      className="w-10 h-10 ease-out duration-200 flex justify-center items-center rounded hover:bg-neutral-100 active:bg-neutral-200"
                      data-setting="phoneNumber"
                      onClick={editProfile}
                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        data-setting="phoneNumber"
                      ></i>
                    </button>
                  </div>
                )}
              </div>
              {Object.values(isEditing).some((_) => _ === true) && (
                <div className="flex justify-center items-center gap-3">
                  <button className="w-32 px-3 py-2 border border-red-700 rounded hover:bg-red-700 hover:text-white active:text-white active:bg-red-800 ease-out duration-200 text-red-700">
                    Cancel
                  </button>
                  <button
                    className="w-32 px-3 py-2 bg-red-600 rounded hover:bg-red-700 active:bg-red-800 ease-out duration-200 text-white"
                    onClick={cancelChanges}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Settings;
