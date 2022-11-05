import React, { useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  return (
    <>
      <header>
        <Navbar user={user} />
      </header>
      <PageRoutes cart={cart} setCart={setCart} />
    </>
  );
}

export default App;
