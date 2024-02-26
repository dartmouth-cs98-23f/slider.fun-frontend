import React, { useState } from 'react'
import Activity from './Activity'
import Statistics from './Statistics'
// import FirebaseUpload from './FirebaseUpload'
import UploadView from './UploadView'

const ProfileViews = ({ token, userInfo, handleGalleryClick }) => {
  const [currentView, setCurrentView] = useState(0)

  const handleView2 = async () => {
    handleGalleryClick()
    setCurrentView(1)
  }

  return (
    <div className='profileViewContainer'>

      <div className='profileViewNav'>
        <button onClick={() => setCurrentView(0)}>Activity</button>
        <button onClick={() => handleView2()}>Gallery</button>
        <button onClick={() => setCurrentView(2)}>Upload</button>

      </div>
      <div className='profileViewContent'>
        {currentView === 0 ? <Activity userInfo={userInfo} /> : ""}
        {currentView === 1 ? <Statistics username={userInfo.email} userInfo={userInfo} /> : ""}
        {currentView === 2 ? <UploadView username={"Admin"} token={token} userInfo={userInfo} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews