import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import seqVideo from "../assets/seq.mov"
import { useNavigate } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';

const SignUp = () => {

  const [err, setErr] = useState(null)

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== null) {
      console.log("sign up page", token)
      navigate("/profile");
    }
  }, [navigate, token])

  // Effect hook to reset error state after 3 seconds
  useEffect(() => {
    let timer;
    if (err !== null) {
      // Set a timer to reset error after 3 seconds
      timer = setTimeout(() => {
        setErr(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [err]);


  return (
    <div className='loginContainer'>
      <video
        autoPlay
        loop
        muted
        playsInline
        id="video"
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '.8' }}
      >
        <source src={seqVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="signUpModal">
        <SignUpForm logoVisible={true} />
      </div>
    </div>
  )
}


export default SignUp