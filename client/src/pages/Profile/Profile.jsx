import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { OrderApi } from "../../api/orderApi";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import ProfileFavoriteMeals from "../../components/Profile/ProfileFavoriteMeals/ProfileFavoriteMeals";
import ProfileFavoriteOrders from "../../components/Profile/ProfileFavoriteOrders/ProfileFavoriteOrders";
import ProfileOrders from "../../components/Profile/ProfileOrders/ProfileOrders";
import ErrorAlert from "../../errors/ErrorAlert";
import { isObjectEmpty } from "../../utils/isObjectEmpty";
const Profile = ({ user }) => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate("/");
  }
  console.log(user);
  const { firstName, _id: user_id } = user;

  return (
    <main className="min-h-screen bg-slate-100 pt-6">
      <div className="mx-auto max-w-2xl flex flex-col gap-6">
        <section className="">
          {user && (
            <div className="flex flex-col gap-6">
              <Card classes="flex justify-between align-center">
                <h3 className="font-lg font-semibold">
                  Welcome back{" " + firstName},
                </h3>

                <Link to="/settings" className="text-slate-500">
                  <i className="fa-solid fa-gear fa-lg"></i>
                </Link>
              </Card>
              {/* <ProfileFavoriteOrders user_id={user_id} /> */}
            </div>
          )}
        </section>
        <div className="">
          <Card padding="p-0">
            <header className="border-b p-3">
              <h3 className="font-lg font-semibold">Recent Orders</h3>
            </header>

            <ProfileOrders user={user} />
          </Card>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Profile;
