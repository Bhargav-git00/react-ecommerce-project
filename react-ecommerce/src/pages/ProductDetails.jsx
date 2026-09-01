import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);

      } catch (error) {

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="product-details">

      <button onClick={() => navigate("/products")}>
        ← Back to Products
      </button>

      <div className="details-container">

        <img
          src={product.image}
          alt={product.title}
        />

        <div>

          <h2>{product.title}</h2>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Price:</strong> ₹ {product.price}
          </p>

          <p>
            <strong>Rating:</strong>{" "}
            {product.rating.rate} ⭐
          </p>

          <p>
            {product.description}
          </p>

          <button>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;