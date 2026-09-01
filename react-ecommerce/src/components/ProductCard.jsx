import React from "react";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../context/CartContext";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
      />

      <h3>{product.title}</h3>

      <p>{product.category}</p>

      <p>₹ {product.price}</p>

      <button onClick={handleViewDetails}>
        View Details
      </button>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;