import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';;

export const AuthContext = createContext();
// online
const API_URL = 'https://slider-fun.onrender.com/api/users';

// local
// const API_URL = 'http://localhost:9090/api/users/';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  console.log(user)
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const signUp = async (email, userName, password) => {
    console.log({ email, userName, password })
    const data = {
      "email": email,
      "userName": userName,
      "name": userName,
      "about": "",
      "password": password
    }
    const response = await axios.post(`${API_URL}/new`, data);
    console.log(response.data.token)
    setToken(response.data.token);
    setUser({ email });
  };

  const signIn = async (email, password) => {
    const response = await axios.post(`${API_URL}/signin`, { email, password });
    console.log(response.data.token)
    setToken(response.data.token);
    setUser({ email });
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    console.log("sign out")
  };

  // retrieve user info using the token
  // const getUserInfo = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }
  //     // Adjust the URL as needed
  //     const response = await axios.get(`${API_URL}/me`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     console.log(response.data)
  //     return response.data;

  //   } catch (error) {
  //     console.error('Error fetching user info:', error);
  //     throw error;
  //   }
  // };

  const value = {
    user,
    token,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
