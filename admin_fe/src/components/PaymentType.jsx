import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCartId, removeCartId } from "../utils/localStorage";
import { useAuth } from "../context/AuthContext";
import "./PaymentType.css";

const PaymentType = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePaymentTypeSelect = (paymentType) => {
    if (paymentType === "Cash") {
      setShowConfirm(true); // Show confirmation modal
    } else {
      alert("Other payment methods are not implemented yet.");
    }
  };

  const handleConfirmOrder = async () => {
    const cartId = getCartId();

    if (!cartId) {
      console.error("No cart ID found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        `${window.location.origin}/api/orders`,
        { cartId, userId: user ? user._id : null, paymentType: "Cash" }
      );
      console.log("Order created successfully:", response.data);

      // Clear the cart
      await axios.delete(`${window.location.origin}/api/carts/${cartId}`);
      removeCartId(); // Remove cart ID from localStorage
      navigate(`/invoice/${response.data._id}`); // Navigate to the invoice page
      setShowConfirm(false); // Hide confirmation modal
      setShowThankYou(true); // Show thank you message

      // Navigate back to shopping page after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
        navigate("/shopping");
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="payment-type">
      <h1>Select Payment Type</h1>
      <div className="payment-buttons">
        <button onClick={() => handlePaymentTypeSelect("Credit Card")}>
          Credit Card
        </button>
        <button onClick={() => handlePaymentTypeSelect("Debit Card")}>
          Debit Card
        </button>
        <button onClick={() => handlePaymentTypeSelect("Bank Transfer")}>
          Bank Transfer
        </button>
        <button onClick={() => handlePaymentTypeSelect("Cash")}>Cash</button>
      </div>

      {showConfirm && (
        <div className="confirm-modal">
          <h2>Confirm Your Order</h2>
          <button onClick={handleConfirmOrder}>Confirm</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}

      {showThankYou && (
        <div className="thank-you-modal">
          <h2>Thank you for your order!</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentType;
