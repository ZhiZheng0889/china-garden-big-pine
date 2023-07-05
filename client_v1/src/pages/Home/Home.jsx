import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import FoodNav from "../../components/Food/FoodNav/FoodNav";
import Card from "../../components/Card/Card";
import FoodSearch from "../../components/Food/FoodSearch/FoodSearch";
import FoodList from "../../components/Food/FoodList/FoodList";
import Footer from "../../components/Footer/Footer";
import Food from "../../components/Food/Food";
import Checkout from "../../components/Checkout/Checkout";
import { useSelector } from "react-redux";
import { removeCategory } from "../../slices/categorySlice";

const Home = () => {
  const [search, setSearch] = useState("");
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    if (search) {
      removeCategory();
    }
  }, [search]);

  useEffect(() => {
    if (category) {
      setSearch(null);
    }
  }, [category]);

  return (
    <main className="bg-gray-100 grow py-3 md:py-6">
      <Container className="custom-grid gap-6">
        <Card padding="p-0" className="overflow-hidden h-fit hidden md:block">
          <FoodNav />
        </Card>

        <section className="flex flex-col gap-3">
          <FoodSearch search={search} setSearch={setSearch} />
          <div>
            <Food search={search} category={category} />
            <Footer />
          </div>
        </section>
        <section className="hidden lg:block">
          <Checkout />
        </section>
      </Container>
    </main>
  );
};

export default Home;
