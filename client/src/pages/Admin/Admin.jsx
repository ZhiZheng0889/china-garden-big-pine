//admin.jsx for admin page
//admin page will have a table of all users
//admin page will have a table of all products
//admin page will have a table of all categories

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listOrders } from '../../api/orderApi';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import ProfileFavoriteMeals from '../../components/Profile/ProfileFavoriteMeals/ProfileFavoriteMeals';
import ProfileFavoriteOrders from '../../components/Profile/ProfileFavoriteOrders/ProfileFavoriteOrders';
import ProfileOrders from '../../components/Profile/ProfileOrders/ProfileOrders';
import ErrorAlert from '../../errors/ErrorAlert';
const Admin = ({ user }) => {
  const [error, setError] = useState(null);
  const { first_name, username, user_id } = user;
  const [orders, setOrders] = useState([]);
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


export default Admin;


// Path: client\src\pages\Admin\Admin.css
//admin.css for admin page
//admin page will have a table of all users
//admin page will have a table of all products
//admin page will have a table of all categories





//admin page will have a form to add a new user
//admin page will have a form to add a new product
//admin page will have a form to add a new category
//admin page will have a form to edit a user
//admin page will have a form to edit a product
//admin page will have a form to edit a category
//admin page will have a form to delete a user
//admin page will have a form to delete a product
//admin page will have a form to delete a category
//admin page will have a form to add a new user
//admin page will have a form to add a new product
//admin page will have a form to add a new category

//help me with this one
//I need to figure out how to get the id of the user I want to delete
//I need to figure out how to get the id of the product I want to delete
//I need to figure out how to get the id of the category I want to delete
//I need to figure out how to get the id of the user I want to edit
//I need to figure out how to get the id of the product I want to edit
//I need to figure out how to get the id of the category I want to edit

