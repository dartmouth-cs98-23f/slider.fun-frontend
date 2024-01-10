import React from 'react'
import "../styles/login.scss"
import domainLogo from "../assets/domain_logo.svg"

const Login = () => {
  return (
    <div className='loginContainer'>
      <video
        autoPlay
        loop
        muted
        playsInline
        id="video"
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '.8'}}
      >
        <source src="https://firebasestorage.googleapis.com/v0/b/sliderdotfun-3af7a.appspot.com/o/videos%2Fseq.mov?alt=media&token=fe8d69fb-7bf0-405f-bacb-ae38a5059d37" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='formContainer'>
        <form>
          <img src={domainLogo} alt=""></img>
          <input placeholder='email' />

          <input placeholder='password' />
          <button>login</button>

        </form>
        <div className='helperContainer'>
          <p className='b1'> Forgot your password? </p>
          <p> not a member yet? <a href="./"> sign up </a> </p>
        </div>
      </div>

    </div>
  )
}

export default Login