import React, { useContext, useEffect, useState } from 'react';
import ModalFooter from './ModalFooter/ModalFooter';
import ErrorAlert from '../../errors/ErrorAlert';
import SpecialRequest from './SpecialRequest/SpecialRequest';
import ModalOptions from './ModalOptions/ModalOptions';
import styles from './Modal.module.css';
import { Cart } from '../../utils/Cart';
import { isObjectEmpty } from '../../utils/isObjectEmpty';
const Modal = ({ food, setCart, cart, setFood }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const [specialRequest, setSpecialRequest] = useState('');
  const [currentOption, setCurrentOption] = useState({});
  const [currentSize, setCurrentSize] = useState({});
  const [error, setError] = useState(null);
  const {
    food_id,
    name = '',
    base_price = null,
    description = '',
    option = null,
    amount = null,
    size = null,
  } = food;

  useEffect(() => {
    const { upCharge: optionUpcharge = 0 } = currentOption;
    const { upCharge: sizeUpcharge = 0 } = currentSize;
    setTotal(quantity * (optionUpcharge + sizeUpcharge + base_price));
  }, [quantity, currentOption, currentSize, base_price]);

  if (!food) return null;

  const handleAddToCart = (event) => {
    if (quantity <= 0) {
      setError({ message: 'Quantity has to be greater than zero' });
    } else {
      const itemToAdd = {
        food_id,
        name,
        description,
        base_price,
        option,
        size,
        quantity,
        currentOption,
        currentSize,
        specialRequest: specialRequest,
      };
      Cart.add(itemToAdd, cart, setCart);
      setFood(null);
    }
  };
  return (
    <>
      <div className={`${styles.modalBackdrop}`}></div>
      <article
        className={`${styles.modal} bg-white border rounded`}
        id="foodModal"
        tabIndex="-1"
        aria-labelledby="foodModalLabel"
        aria-hidden={food ? true : false}
      >
        <header className="flex items-center p-3">
          <button
            type="button"
            className="w-10 h-10 hover:bg-slate-100 rounded-full"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setFood(null)}
          >
            <i className="fa-regular fa-xmark fa-2x"></i>
          </button>
        </header>
        <section className="px-3">
          {<ErrorAlert error={error} />}
          <h2 className="text-5xl mb-5">{name}</h2>
          <p>{description}</p>
          {size && (
            <ModalOptions
              title={'Size Options'}
              description={'Choose 1'}
              options={size}
              selectedOption={currentSize}
              setSelectedOption={setCurrentSize}
              optionType={'size'}
            />
          )}
          {option && (
            <ModalOptions
              title={'Options'}
              options={option}
              selectedOption={currentOption}
              setSelectedOption={setCurrentOption}
              optionType={'options'}
            />
          )}
          <SpecialRequest
            specialRequest={specialRequest}
            setSpecialRequest={setSpecialRequest}
          />
        </section>
        <ModalFooter
          total={total}
          setQuantity={setQuantity}
          quantity={quantity}
          handleAddToCart={handleAddToCart}
        />
      </article>
    </>
  );
};

export default Modal;
