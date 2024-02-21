import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconUserCircle } from '@tabler/icons-react';

const ProfileIcon = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/profile")}>
      <IconUserCircle className="profileIcon" />
    </div>
  )
}

export default ProfileIcon