import React, { useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Checkout from '../../components/Checkout/Checkout';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import StoreInfo from '../../components/StoreInfo/StoreInfo';
import FoodList from '../../components/Food/FoodList/FoodList';
import ErrorAlert from '../../errors/ErrorAlert';
import MenuNav from '../../components/MenuNav/MenuNav';
const Home = ({ cart, setCart }) => {
  // state of category nav
  const [category, setCategory] = useState('appetizers');
  // state of searchbar
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  return (
    <main className={styles.main}>
      <section className={styles.center}>
        {/* Main content */}
        <div className="mb-2">
          <Searchbar search={search} setSearch={setSearch} />
        </div>

        <Card padding={'p-0'} margin={'mt-gap'}>
          {error && (
            <div className="p-3 pb-0">
              <ErrorAlert error={error} />
            </div>
          )}
          <StoreInfo />
          <MenuNav query={category} setQuery={setCategory} />
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
      </section>
      <aside className={styles.aside}>
        <Checkout />
      </aside>
    </main>
  );
};

export default Home;
