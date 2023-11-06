import React from 'react'
import "../styles/header.scss"
import sliderHeader from "../assets/header_red.png"

const Header = () => {
  return (
    <div className='headerContainer'>
      <img src={sliderHeader} alt="" width="800"></img>
    </div>
  )
}

export default Header