import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { signOut, getUserInfo } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (token === null) {
      console.log("profile page", token)
      navigate("/profile");
    }
  }, [navigate, token])

  console.log(currentUser)

  const signOutHandler = async () => {
    // Clear the token from localStorage or context
    try {
      await signOut();
    } catch (error) {
      console.log(error)
    }
    navigate("/login");
  };

  // const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setCurrentUser(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, [getUserInfo, setCurrentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>Profile page
      <h1>User Profile</h1>
      <p>Name: {currentUser.name}</p>
      <p>Email: {currentUser.email}</p>
      <button onClick={signOutHandler}>Sign out</button>
    </div>
  )
}

export default Profile