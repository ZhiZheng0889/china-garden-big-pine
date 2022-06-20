import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Checkout from '../../components/Checkout/Checkout';
import MainContent from '../../components/MainContent/MainContent';
import styles from './Home.module.css';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';
const Home = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className="row">
          <aside className="d-none d-lg-block col-lg-3 col-xl-2">
            <SideBar />
          </aside>
          <section className="col-12 col-lg-9 col-xl-6">
            <div className="mb-3">
              <Card>
                <div className="p-3">
                  <SearchBar />
                </div>
              </Card>
            </div>
            <MainContent />
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
