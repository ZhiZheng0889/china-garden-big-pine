import React, { useEffect, useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Checkout from '../../components/Checkout/Checkout';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import StoreInfo from '../../components/StoreInfo/StoreInfo';
import FoodList from '../../components/Food/FoodList/FoodList';
import ErrorAlert from '../../errors/ErrorAlert';
import MenuNav from '../../components/MenuNav/MenuNav';
import Footer from '../../components/Footer/Footer';
import SideNav from '../../components/Nav/SideNav/SideNav';
const Home = ({ cart, setCart, isCheckoutOpen, category, setCategory }) => {
  // state of searchbar
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setCategory('');
  }, [search]);

  return (
    <main className={`min-h-screen bg-slate-100 pt-6 `}>
      <div className={`container gap-6 custom-grid mx-auto`}>
        <Card padding="p-0" classes="hidden md:block h-fit sticky top-5">
          <SideNav
            className="hidden md:block"
            category={category}
            setCategory={setCategory}
          />
        </Card>

        <section>
          <div className="mb-6">
            <Searchbar search={search} setSearch={setSearch} />
          </div>

          <Card padding={'p-0'} margin={'mt-gap'}>
            {error && (
              <div className="p-3 pb-0">
                <ErrorAlert error={error} />
              </div>
            )}
            <StoreInfo />
            {/* <MenuNav category={category} setCategory={setCategory} /> */}
            <FoodList
              category={category}
              search={search}
              setError={setError}
              error={error}
              cart={cart}
              setCart={setCart}
            />
          </Card>
          {/* End Main Content*/}
          <Footer />
        </section>
        <aside>
          <Card padding="p-0">
            <Checkout
              cart={cart}
              setCart={setCart}
              className="hidden xl:block"
            />
          </Card>
        </aside>
      </div>
    </main>
  );
};

export default Home;
