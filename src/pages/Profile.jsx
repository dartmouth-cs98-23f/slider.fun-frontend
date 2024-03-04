import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import '../styles/profile.scss';
import ProfileViews from '../components/ProfileViews';
import LeftProfileBar from '../components/LeftProfileBar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, userSignOut } from '../actions/userAction';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.info);
  const userToken = localStorage.getItem('token');

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("userToken", userToken)
    if (!userToken) {
      // console.log("Redirecting to login page", userToken);
      navigate("/login");
    } else {
      if (!currentUser) {
        dispatch(getUserInfo(userToken))
        navigate("/profile");
      }
    }
  }, [navigate, userToken, dispatch]);

  const signOutHandler = async () => {
    try {
      dispatch(userSignOut())
      navigate("/login");
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  if (!currentUser) {
    // console.log(currentUser)
    return <div>User not found...</div>;
  }

  return (
    <div className='profileContainer'>
      <LeftProfileBar userInfo={currentUser} signOutHandler={signOutHandler} />
      <div className='rightProfileBar'>
        <ProfileViews token={localStorage.getItem('token')} userInfo={currentUser} />
      </div>
    </div>
  );
};

export default Profile;
