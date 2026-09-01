import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const fetchProducts = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchProducts();

  }, []);


  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};


export { ProductProvider };

export default ProductContext;