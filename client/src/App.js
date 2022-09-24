import React, { useState } from 'react';
import PageRoutes from './pages/Routes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <header>
        <Navbar user={user} />
      </header>
      <PageRoutes />
      <Footer />
    </>
  );
}

export default App;
