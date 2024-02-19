import React, { useState } from 'react'
import Activity from './Activity'
import Statistics from './Statistics'
// import FirebaseUpload from './FirebaseUpload'
import UploadView from './UploadView'
import axios from 'axios'

const ProfileViews = ({ token, userId }) => {
  const [currentView, setCurrentView] = useState(0)
  const API_URL = 'https://slider-fun.onrender.com/api/users';
  const [photoObjectList, setPhotoObjectList] = useState([])
  const handleGalleryClick = async () => {

    // Adjust the URL as needed
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setPhotoObjectList(response.data.photos)
    console.log(response.data)
    setCurrentView(1)
  }

  return (
    <div className='profileViewContainer'>

      <div className='profileViewNav'>
        <button onClick={() => setCurrentView(0)}>Activity</button>
        <button onClick={() => handleGalleryClick()}>Gallery</button>
        <button onClick={() => setCurrentView(2)}>Upload</button>

      </div>
      <div className='profileViewContent'>
        {currentView === 0 ? <Activity username={"Admin"} /> : ""}
        {currentView === 1 ? <Statistics username={"Admin"} userId={userId} photoObjectList={photoObjectList} /> : ""}
        {currentView === 2 ? <UploadView username={"Admin"} token={token} userId={userId} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews