//admin.jsx for admin page
//admin page will have a table of all users
//admin page will have a table of all products
//admin page will have a table of all categories

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Footer from '../../components/Footer/Footer';
import {isObjectEmpty} from '../../utils/isObjectEmpty';

const Admin = ({ user }) => {
  const [error] = useState(null);
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate('/');
  }
  return (
    <main className="min-h-screen bg-slate-100 flex justify-center pt-6">
      <div className="container grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">
        <section className="">
          {user && (
            <div className="flex flex-col gap-6">
              <Card classes="flex justify-between align-center">
                <Link to="/settings" className="text-slate-500">
                  <i className="fa-regular fa-gear fa-lg"></i>
                </Link>
              </Card>
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
        </aside>
      </div>
    </main>
  );
};

export default Admin;
