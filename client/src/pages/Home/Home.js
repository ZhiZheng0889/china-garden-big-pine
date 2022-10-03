import React, { useState } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Checkout from '../../components/Checkout/Checkout';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import StoreInfo from '../../components/StoreInfo/StoreInfo';
import FoodList from '../../components/Food/FoodList/FoodList';
import ErrorAlert from '../../errors/ErrorAlert';
const Home = ({ cart, setCart }) => {
  const [query, setQuery] = useState('appetizers');
  const [error, setError] = useState(null);
  return (
    <main className={styles.main}>
      <section className={styles.center}>
        {/* Main content */}
        <div className="mb-2">
          <Searchbar />
        </div>

        <Card padding={'p-0'} margin={'mt-gap'}>
          {error && (
            <div className="p-3 pb-0">
              <ErrorAlert error={error} />
            </div>
          )}
          <StoreInfo />
          <FoodList query={query} setError={setError} error={error} />
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
