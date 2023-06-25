import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import FoodNav from "../../components/Food/FoodNav/FoodNav";
import Card from "../../components/Card/Card";
import FoodSearch from "../../components/Food/FoodSearch/FoodSearch";
import FoodList from "../../components/Food/FoodList/FoodList";
import Footer from "../../components/Footer/Footer";
import Food from "../../components/Food/Food";
import Checkout from "../../components/Checkout/Checkout";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      setCategory(null);
    }
  }, [search]);

  useEffect(() => {
    if (category) {
      setSearch(null);
    }
  }, [category]);

  return (
    <main className="bg-gray-100 grow py-6">
      <Container className="custom-grid gap-6">
        <Card padding="p-0" className="overflow-hidden h-fit">
          <FoodNav category={category} setCategory={setCategory} />
        </Card>

        <section className="flex flex-col gap-3">
          <FoodSearch search={search} setSearch={setSearch} />
          <div>
            <Food search={search} category={category} />
            <Footer />
          </div>
        </section>
        <section>
          <Checkout />
        </section>
      </Container>
    </main>
  );
};

export default Home;
