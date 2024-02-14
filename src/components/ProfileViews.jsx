import React, { useState } from 'react'
import Activity from './Activity'
import Statistics from './Statistics'
import FirebaseUpload from './FirebaseUpload'
import UploadView from './UploadView'

const ProfileViews = ({ token, userId, photoObjectList }) => {
  const [currentView, setCurrentView] = useState(0)

  return (
    <div className='profileViewContainer'>

      <div className='profileViewNav'>
        {/* <button onClick={() => setCurrentView(0)}>Activity</button> */}
        <button onClick={() => setCurrentView(1)}>Gallery</button>
        <button onClick={() => setCurrentView(2)}>Upload</button>
      </div>
      <div className='profileViewContent'>
        {currentView === 0 ? <Activity username={"Admin"} /> : ""}
        {currentView === 1 ? <Statistics username={"Admin"} photoObjectList={photoObjectList} /> : ""}
        {currentView === 2 ? <UploadView username={"Admin"} token={token} userId={userId} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews