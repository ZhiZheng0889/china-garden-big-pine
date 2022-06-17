import React from 'react';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import PageRoutes from './pages/Routes';
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <PageRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
