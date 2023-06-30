import React from "react";

const TrackOrders = () => {
  const [error, setError] = useState(null);
  return (
    <main className="min-h-screen bg-slate-100 pt-6">
      <section className="mx-auto max-w-2xl bg-white bg-slate-100 flex flex-col gap-4">
        <ErrorAlert error={error} />
        <Card padding="p-0">
          <header className="border-b p-3">
            <h3 className="font-semibold">Orders</h3>
          </header>
        </Card>
      </section>
    </main>
  );
};

export default TrackOrders;
