// CheckoutCustomerComment.jsx
import React, { useState } from "react";

const CheckoutCustomerComment = () => {
  const [customerComments, setCustomerComments] = useState('');

  const handleCommentChange = (event) => {
    setCustomerComments(event.target.value);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Customer Comments</h3>
      <textarea value={customerComments} onChange={handleCommentChange} placeholder="Add your comments here..." />
    </div>
  );
};

export default CheckoutCustomerComment;
