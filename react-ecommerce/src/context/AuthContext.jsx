import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Check localStorage when application starts
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);


  // Login function
  const login = async (email, password) => {

    const response = await fetch(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );

    const users = await response.json();

    if (users.length === 0) {
      throw new Error("Invalid email or password");
    }

    const loggedInUser = users[0];

    setUser(loggedInUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    return loggedInUser;
  };


  // Logout function
  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider };

export default AuthContext;