import React from 'react'
import CollapsibleHeader from './CollabsableHeader'
import { IconQuestionMark } from '@tabler/icons-react';
import ProgressBar from './ProgressBar'

const LeftProfileBar = ({ userInfo, signOutHandler }) => {
  return (
    <div className='leftProfileBar'>
      <div className='topBar'>
        <div className='avatarContainer'>
          <img className='avatar' src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
        </div>
        <div className='username'>
          <div>
            {userInfo.name}
          </div>
          <div>
            {userInfo.email}
          </div>
        </div>
      </div>
      <div className='middleBar'>
        <div >
          <div className='rowFlex sliderScoreHeader'>
            <div className='headerText'> SliderScore </div>
            <div className='scoreQuestionMark'> <IconQuestionMark size={15} /> </div>
          </div>

          <div className='headerText'> {userInfo.sliderScore}</div>
          <ProgressBar bgcolor="green" completed={userInfo.sliderScore} />

        </div>
        <CollapsibleHeader title="About" content="This is the admin account for slider" />
        <CollapsibleHeader title="Achievements" content="no achievement yet" />
      </div>
      <div >
        <button onClick={signOutHandler}>Sign out</button>
      </div>

    </div>
  )
}

export default LeftProfileBar