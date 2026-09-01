import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    try {

      // Check whether email already exists
      const checkResponse = await fetch(
        `http://localhost:3000/users?email=${email}`
      );

      const existingUsers = await checkResponse.json();


      if (existingUsers.length > 0) {

        setError("Email already registered");

        return;
      }


      // Create new user
      const response = await fetch(
        "http://localhost:3000/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );


      if (!response.ok) {
        throw new Error("Registration failed");
      }


      setSuccess(
        "Registration successful! Redirecting to login..."
      );


      setName("");
      setEmail("");
      setPassword("");


      setTimeout(() => {
        navigate("/login");
      }, 1500);


    } catch (error) {

      setError(error.message);

    }

  };


  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleRegister}
      >

        <h2>Register</h2>


        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />


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
          Register
        </button>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        {success && (
          <p className="success">
            {success}
          </p>
        )}

      </form>

    </div>
  );
};


export default Register;