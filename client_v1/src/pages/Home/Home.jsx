import React, { useState } from "react";
import Container from "../../components/Container/Container";

const Home = () => {
  const [food, setFoods] = useState([]);
  const [category, setCategory] = useState("all");

  return (
    <main className="bg-gray-100 grow">
      <Container className="custom-grid gap-6"></Container>
    </main>
  );
};

export default Home;
