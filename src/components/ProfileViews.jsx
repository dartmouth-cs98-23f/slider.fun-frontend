import React, { useState } from 'react'
import Statistics from './Statistics'
import UploadView from './UploadView'
import { useSelector } from 'react-redux'
// import UserCompletedDaily from './UserCompletedDaily'

const ProfileViews = ({ token }) => {
  const [currentView, setCurrentView] = useState(1)
  const userInfo = useSelector(state => state.user.info);

  return (
    <div className='profileViewContainer'>
      <div className='profileViewNav'>
        {/* <button onClick={() => setCurrentView(0)}>Puzzles</button> */}
        <button onClick={() => setCurrentView(1)}>Gallery</button>
        <button onClick={() => setCurrentView(2)}>Upload</button>
      </div>
      <div className='profileViewContent'>
        {/* {currentView === 0 ? <UserCompletedDaily userInfo={userInfo} /> : ""} */}
        {currentView === 1 ? <Statistics username={userInfo.email} userInfo={userInfo} /> : ""}
        {currentView === 2 ? <UploadView username={userInfo.userName} token={token} userInfo={userInfo} /> : ""}

      </div>
    </div>
  )
}

export default ProfileViews