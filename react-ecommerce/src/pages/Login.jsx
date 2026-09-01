import React, { useState } from "react";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";


const Login = () => {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");


    try {

      await login(email, password);

      navigate("/");

    } catch (error) {

      setError(error.message);

    }

  };


  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h2>Login</h2>


        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />


        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />


        <button type="submit">
          Login
        </button>


        {error && (
          <p className="error">
            {error}
          </p>
        )}

      </form>

    </div>
  );
};


export default Login;