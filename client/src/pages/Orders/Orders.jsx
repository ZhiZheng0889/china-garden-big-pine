import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
import ErrorAlert from '../../errors/ErrorAlert';
import Card from '../../components/Card/Card';
import ProfileOrders from '../../components/Profile/ProfileOrders/ProfileOrders';
const Orders = ({ user }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  if (isObjectEmpty(user)) {
    navigate('/');
  }
  return (
    <main className="min-h-screen bg-slate-100 pt-6">
      <section className="mx-auto max-w-2xl bg-white bg-slate-100 flex flex-col gap-4">
        <ErrorAlert error={error} />
        <Card padding="p-0">
          <header className="border-b p-3">
            <h3 className="font-semibold">Orders</h3>
          </header>

          <ProfileOrders user={user} />
        </Card>
      </section>
    </main>
  );
};

export default Orders;
