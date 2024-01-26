import React from 'react'
import CollapsibleHeader from './CollabsableHeader'
import { IconInfoSquareRounded } from '@tabler/icons-react';

const LeftProfileBar = ({ signOutHandler }) => {
  return (
    <div className='leftProfileBar'>
      <div className='topBar'>
        <div className='avatarContainer'>
          <img className='avatar' src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
        </div>
        <div className='username'>
          <div>
            Admin
          </div>
          <div>
            @admin
          </div>
        </div>
      </div>
      <div className='middleBar'>
        <div >
          <div className='rowFlex sliderScoreHeader'>
            <div className='headerText'> SliderScore </div>
            <div> <IconInfoSquareRounded /> </div>
          </div>

          <div className='headerText'> 78</div>
          <progress className="progressBar" value={.1} />

        </div>
        <CollapsibleHeader title="About" />
        <CollapsibleHeader title="Achievements" />
      </div>
      <div >
        <button onClick={signOutHandler}>Sign out</button>
      </div>

    </div>
  )
}

export default LeftProfileBar