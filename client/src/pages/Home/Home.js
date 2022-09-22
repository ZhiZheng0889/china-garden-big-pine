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
    <div className={styles.main}>
      <div className="container">
        <div className="row">
          <aside className="d-none d-lg-block col-lg-3 col-xl-2">
            <Sidebar query={query} setQuery={setQuery}/>
          </aside>
          <section className="col-12 col-lg-9 col-xl-6">
            <Searchbar />
            <Card padding={'p-0'} margin={'mt-3'}>
              <div className="p-3 pb-0">
                <ErrorAlert error={error} />
              </div>
              <StoreInfo />
              <FoodList query={query} setError={setError} error={error} />
            </Card>
          </section>
          <aside className="d-none d-xl-block col-xl-4">
            <Checkout />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;
