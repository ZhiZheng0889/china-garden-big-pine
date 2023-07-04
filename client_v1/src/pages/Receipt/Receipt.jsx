import React from "react";
import ContainerSmall from "../../components/Container/ContainerSmall/ContainerSmall";
import Order from "../../components/Order/Order";
import { useParams } from "react-router-dom";

const Receipt = () => {
  const { order_id } = useParams();
  return (
    <main className="bg-gray-100 grow py-6">
      <ContainerSmall>
        <Order order_id={order_id} />
      </ContainerSmall>
    </main>
  );
};

export default Receipt;
