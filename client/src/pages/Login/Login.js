import React from 'react';
import styles from './Login.module.css';
// imports for replicatinhg listFoods for modal testing
import { useState, useEffect } from 'react';
import { listFoods } from '../../api/foodApi';
import Modal from '../../components/Modal/Modal';
const Login = () => {
  // get data to replicate listFoods for the modal testing
  const [query, setQuery] = useState('appetizers');
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  // Get food items based on query of food type
  useEffect(() => {
    setError(null);
    setFoods([]);
    // create abort controller to handle cancelling
    // requests on query change
    const abortControler = new AbortController();
    const getFoods = async () => {
      try {
        const response = await listFoods(
          { category: query },
          abortControler.signal
        );
        setFoods(response);
      } catch (error) {
        setError(error);
      }
    };
    getFoods();
    return () => abortControler.abort();
  }, [query]);

  const [currentFood, setCurrentFood] = useState(null);
  // function that onClick sets current food and opens modal
  const toggleModal = () => {
    setCurrentFood(foods[0]);
  };
  console.log(foods);
  console.log(currentFood);
  return (
    <section className={styles.container}>
      <button className="btn btn-primary" onClick={toggleModal}>
        Show Modal
      </button>
      {currentFood && <Modal food={currentFood} />}
    </section>
  );
};

export default Login;
