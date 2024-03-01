import React, { useState } from 'react'
import Statistics from './Statistics'
import UploadView from './UploadView'
import { useSelector } from 'react-redux'

const ProfileViews = ({ token }) => {
  const [currentView, setCurrentView] = useState(2)
  const userInfo = useSelector(state => state.user.info);
  const handleView2 = async () => {
    setCurrentView(1)
  }

  return (
    <div className='profileViewContainer'>

      <div className='profileViewNav'>
        {/* <button onClick={() => setCurrentView(0)}>Activity</button> */}
        <button onClick={() => handleView2()}>Gallery</button>
        <button onClick={() => setCurrentView(2)}>Upload</button>

      </div>
      <div className='profileViewContent'>
        {/* {currentView === 0 ? <Activity userInfo={userInfo} /> : ""} */}
        {currentView === 1 ? <Statistics username={userInfo.email} userInfo={userInfo} /> : ""}
        {currentView === 2 ? <UploadView username={"Admin"} token={token} userInfo={userInfo} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews