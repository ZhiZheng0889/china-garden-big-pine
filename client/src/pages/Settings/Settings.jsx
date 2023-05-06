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
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-slate-100 py-6">
        <section className="mx-auto max-w-2xl flex-flex-col gap-4">
          <Card padding="p-0">
            <header className="p-3 border-b">
              <h3 className="font-semibold text-xl">Settings</h3>
            </header>
            <form className="p-3 flex flex-col gap-3">
              {isEditingFirstName ? (
                <div className="flex">
                  <p></p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="p-2 border rounded focus:outline outline-2 outline-offset-2 outline-red-600"
                    value={user.firstName}
                    placeholder="First Name..."
                  />
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
