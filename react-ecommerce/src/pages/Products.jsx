import React, { useContext, useState } from "react";

import ProductContext from "../context/ProductContext";

import ProductCard from "../components/ProductCard";


const Products = () => {

  const {
    products,
    loading,
    error
  } = useContext(ProductContext);


  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState("default");


  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category))
  ];


  // Search + category filtering
  let filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesCategory =
      category === "all" ||
      product.category === category;


    return matchesSearch && matchesCategory;

  });


  // Sorting
  if (sort === "low-high") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sort === "high-low") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  if (sort === "name") {

    filteredProducts.sort(
      (a, b) =>
        a.title.localeCompare(b.title)
    );

  }


  if (loading) {
    return <h2>Loading products...</h2>;
  }


  if (error) {
    return (
      <div>

        <h2>{error}</h2>

        <button>
          Try Again
        </button>

      </div>
    );
  }


  return (

    <div className="products-page">

      <h2>Products</h2>


      {/* Search */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          {categories.map((cat) => (

            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>

          ))}

        </select>


        {/* Sorting */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="default">
            Sort By
          </option>

          <option value="low-high">
            Price: Low to High
          </option>

          <option value="high-low">
            Price: High to Low
          </option>

          <option value="name">
            Name
          </option>

        </select>

      </div>


      {/* Products */}

      <div className="products-container">

        {filteredProducts.length === 0 ? (

          <h3>
            No products found.
          </h3>

        ) : (

          filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        )}

      </div>

    </div>
  );
};


export default Products;