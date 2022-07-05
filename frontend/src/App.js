import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PageRoutes from './pages/Routes';
function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <header>
        <Navbar cart={cart} setCart={setCart} />
      </header>
      <main>
        <PageRoutes cart={cart} setCart={setCart} />
      </main>
      <Footer />
    </>
  );
}

export default App;
