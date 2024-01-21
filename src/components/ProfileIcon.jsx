import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileIcon = () => {
  const navigate = useNavigate();
  return (
    <button className="loginButton" onClick={() => navigate("/profile")}> profile </button>
  )
}

export default ProfileIcon