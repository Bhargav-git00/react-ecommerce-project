import React from "react";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../context/CartContext";

const Cart = () => {

    const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <h2>Your Cart is Empty</h2>

        <p>Add some products to your cart.</p>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h2>Your Cart</h2>

      {cart.map((item) => (

        <div
          className="cart-item"
          key={item.id}
        >

          <img
            src={item.image}
            alt={item.title}
          />

          <div>

            <h3>{item.title}</h3>

            <p>₹ {item.price}</p>

            <div className="quantity-controls">

              <button
                onClick={() =>
                  decreaseQuantity(item.id)
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  increaseQuantity(item.id)
                }
              >
                +
              </button>

            </div>

            <button
              onClick={() =>
                removeFromCart(item.id)
              }
            >
              Remove
            </button>

          </div>

        </div>

      ))}

      <h2>
        Total: ₹ {total.toFixed(2)}
      </h2>

        <button
            onClick={() => navigate("/checkout")}
            >
            Proceed to Checkout
        </button>

    </div>
  );
};

export default Cart;