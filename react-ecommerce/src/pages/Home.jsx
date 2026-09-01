import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

const navigate = useNavigate();

return ( <div className="home-page">

```
  <section className="hero">

    <div className="hero-content">

      <h1>Welcome to MyStore</h1>

      <p>
        Discover great products at amazing prices.
      </p>

      <button onClick={() => navigate("/products")}>
        Shop Now
      </button>

    </div>

  </section>


  <section className="features">

    <div className="feature-card">

      <h3>Wide Range of Products</h3>

      <p>
        Explore electronics, clothing, jewelry and more.
      </p>

    </div>


    <div className="feature-card">

      <h3>Easy Shopping</h3>

      <p>
        Search, filter and sort products easily.
      </p>

    </div>


    <div className="feature-card">

      <h3>Easy Checkout</h3>

      <p>
        Add your favorite products to the cart and checkout easily.
      </p>

    </div>

  </section>


  <section className="about-store">

    <h2>Everything You Need in One Place</h2>

    <p>
      Browse our collection, find the products you like,
      add them to your cart and enjoy a simple shopping experience.
    </p>

  </section>

</div>


);
};

export default Home;


