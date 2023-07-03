import React, { useState } from "react";
import ContainerSmall from "../../components/Container/ContainerSmall/ContainerSmall";
import Card from "../../components/Card/Card";
import CheckoutComponent from "../../components/Checkout/Checkout";
import FormInputContainer from "../../components/Form/FormInputContainer/FormInputContainer";
import FormEditableField from "../../components/Form/FormEditableField/FormEditableField";
import ButtonPrimary from "../../components/Button/ButtonPrimary/ButtonPrimary";
import { useSelector } from "react-redux";
import FormTextAreaContainer from "../../components/Form/FormTextAreaContainer/FormTextAreaContainer";
const Checkout = () => {
  const [name, setName] = useState("");
  const [customPickupTime, setCustomPickupTime] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderComment, setOrderComment] = useState("");

  const { cart } = useSelector((state) => state.cart);

  const placeOrder = async () => {};

  return (
    <main className="bg-gray-100 grow py-6">
      <ContainerSmall>
        <div className="flex flex-col gap-5">
          <Card padding="p-0">
            <div className="p-3 flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Checkout</h2>
              <h5 className="text-lg font-semibold">1.Confirm Order</h5>
            </div>
            <CheckoutComponent hideButton />
          </Card>
          <Card padding="p-0">
            <div className="p-3 border-b">
              <h5 className="text-lg font-semibold">2.Confirm Pickup Time</h5>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center p-3">
                <p>Estimated completion time</p>
                <p className="text-xl font-semibold">15-25 Minutes</p>
              </div>
              <div className="w-full relative block px-3 py-5">
                <hr />
                <p className="bg-white py-1 px-3 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  Or
                </p>
              </div>
              <div className="w-full p-3">
                <h5 className="text-center text-lg font-semibold">
                  Custom Pickup Time
                </h5>
                <FormEditableField
                  state={customPickupTime}
                  setState={setCustomPickupTime}
                  id="pickup-time"
                  placeholder="Pickup time..."
                  name="pickup time"
                />
              </div>
            </div>
          </Card>
          <Card padding="p-0">
            <div className="p-3 border-b">
              <h5 className="text-lg font-semibold">3.Enter Information</h5>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <FormInputContainer
                state={phoneNumber}
                setState={setPhoneNumber}
                placeholder="Enter a phone number..."
                usePhoneInput={true}
                name="phone number"
                isRequired
              />
              <FormInputContainer
                state={name}
                setState={setName}
                placeholder="Enter a name..."
                name="name"
                isRequired
              />
              <FormTextAreaContainer
                state={orderComment}
                setState={setOrderComment}
                placeholder="Comment..."
                name="comment"
                isRequired
              />
            </div>
          </Card>
          <ButtonPrimary>Place Order</ButtonPrimary>
        </div>
      </ContainerSmall>
    </main>
  );
};

export default Checkout;
