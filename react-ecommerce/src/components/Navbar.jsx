import React from "react";

import { NavLink } from "react-router-dom";

import { useContext } from "react";

import CartContext from "../context/CartContext";

import AuthContext from "../context/AuthContext";


const Navbar = () => {

  const { cart } = useContext(CartContext);

  const { user, logout } = useContext(AuthContext);


  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <nav>

      <h2>MyStore</h2>


      <div>

        <NavLink to="/">
          Home
        </NavLink>


        <NavLink to="/products">
          Products
        </NavLink>


        <NavLink to="/cart">
          Cart ({cartCount})
        </NavLink>


        {user ? (

          <>
            <span>
              Hi, {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>

        ) : (

          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <NavLink to="/register">
              Register
            </NavLink>
          </>

        )}

      </div>

    </nav>
  );
};


export default Navbar;