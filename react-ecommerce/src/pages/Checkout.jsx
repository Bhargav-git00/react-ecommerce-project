import React from "react";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../context/CartContext";

import AuthContext from "../context/AuthContext";


const Checkout = () => {

  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  const { user } = useContext(AuthContext);


  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );


  const handleOrder = () => {

    alert("Order placed successfully!");

    navigate("/");

  };


  return (
    <div className="checkout-page">

      <h2>Checkout</h2>


      <div className="checkout-user">

        <h3>Customer Details</h3>

        <p>
          Name: {user.name}
        </p>

        <p>
          Email: {user.email}
        </p>

      </div>


      <div className="checkout-products">

        <h3>Order Summary</h3>

        {cart.map((item) => (

          <div
            className="checkout-item"
            key={item.id}
          >

            <span>
              {item.title}
            </span>

            <span>
              {item.quantity} × ₹{item.price}
            </span>

          </div>

        ))}

      </div>


      <h2>
        Total: ₹ {total.toFixed(2)}
      </h2>


      <button onClick={handleOrder}>
        Place Order
      </button>

    </div>
  );
};


export default Checkout;