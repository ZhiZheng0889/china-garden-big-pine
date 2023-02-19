import React, { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { listOrders } from '../../api/orderApi';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import ProfileFavoriteMeals from '../../components/Profile/ProfileFavoriteMeals/ProfileFavoriteMeals';
import ProfileFavoriteOrders from '../../components/Profile/ProfileFavoriteOrders/ProfileFavoriteOrders';
import ProfileOrders from '../../components/Profile/ProfileOrders/ProfileOrders';
import ErrorAlert from '../../errors/ErrorAlert';
const Profile = ({ user }) => {
  const [error, setError] = useState(null);

  const [orders, setOrders] = useState([]);
  if (!user) {
    redirect('/');
  }
  useEffect(() => {
    setError(null);
    (async () => {
      try {
        const response = await listOrders(user_id);
        if (response) {
          setOrders(response);
        }
      } catch (error) {
        setError(error);
      }
    })();
  }, [user_id]);
  const { first_name, username, user_id } = user;
  return (
    <main className="min-h-screen bg-slate-100 flex justify-center pt-6">
      <div className="container grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <section className="">
          {user && (
            <div className="flex flex-col gap-6">
              <Card classes="flex justify-between align-center">
                <h3 className="font-lg font-semibold">
                  Welcome back, {first_name}
                </h3>
                <Link to="/settings" className="text-slate-500">
                  <i className="fa-regular fa-gear fa-lg"></i>
                </Link>
              </Card>
              <ProfileFavoriteOrders user_id={user_id} />
              <ProfileFavoriteMeals user_id={user_id} />
            </div>
          )}
          <Footer />
        </section>
        <aside className="">
          {error && (
            <div className="pb-3">
              <ErrorAlert error={error} />
            </div>
          )}
          <Card>
            <h3 className="font-lg font-semibold">Your Orders</h3>
            <ProfileOrders orders={orders} />
          </Card>
        </aside>
      </div>
    </main>
  );
};

export default Profile;
