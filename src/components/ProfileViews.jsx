import React, { useState } from 'react'
import Activity from './Activity'
import Statistics from './Statistics'

const ProfileViews = () => {
  const [currentView, setCurrentView] = useState(0)

  return (
    <div className='profileViewContainer'>

      <div className='profileViewNav'>
        <button onClick={() => setCurrentView(0)}>Activity</button>
        <button onClick={() => setCurrentView(1)}>Gallery</button>
      </div>
      <div className='profileViewContent'>
        {currentView === 0 ? <Activity username={"Admin"} /> : ""}
        {currentView === 1 ? <Statistics username={"Admin"} /> : ""}
      </div>
    </div>
  )
}

export default ProfileViews