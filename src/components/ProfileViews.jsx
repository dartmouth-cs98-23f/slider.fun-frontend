import React, { useState } from 'react'
import Activity from './Activity'
import Statistics from './Statistics'
import FirebaseUpload from './FirebaseUpload'
import UploadView from './UploadView'

const ProfileViews = () => {
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
        {currentView === 1 ? <Statistics username={"Admin"} /> : ""}
        {currentView === 2 ? <UploadView username={"Admin"} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews