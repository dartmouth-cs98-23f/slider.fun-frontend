import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.scss';
import ProfileViews from '../components/ProfileViews';
import LeftProfileBar from '../components/LeftProfileBar';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { signOut, getUserInfo } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);


  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setCurrentUser(data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  // Use an effect for redirecting if the user is not authenticated
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      console.log("Redirecting to login page", userToken);
      navigate("/login");
    } else {
      // Fetch user info if token is present
      fetchUserInfo();
    }
  },);

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleGalleryClick = async () => {
    // Adjust the URL as needed
    fetchUserInfo();
  }

  if (!currentUser) {
    return <div>User not found...</div>;
  }



  return (
    <div className='profileContainer'>
      <LeftProfileBar signOutHandler={signOutHandler} />
      <div className='rightProfileBar'>
        <ProfileViews token={localStorage.getItem('token')} userId={currentUser.id} photoObjectList={currentUser.photos} handleGalleryClick={handleGalleryClick} />
      </div>
    </div>
  );
};

export default Profile;
