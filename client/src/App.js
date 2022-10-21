import React, { useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CartContext } from './context/CartContext';
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  return (
    <>
      <CartContext.Provider value={cart}>
        <header>
          <Navbar user={user} />
        </header>
        <PageRoutes />
      </CartContext.Provider>
    </>
  );
}

export default App;
