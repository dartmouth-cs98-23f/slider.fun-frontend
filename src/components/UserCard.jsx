import React from 'react'

const UserCard = (props) => {
  return (
    <div className='userCardContainer'>
      <div className='leftContainer'>
        <h3>  {props.rank + 1} </h3>
        <div>  {props.userInfo.userName} </div>
      </div>
      <div className='rightContainer'>  {props.userInfo.sliderScore} </div>


    </div>
  )
}

export default UserCard